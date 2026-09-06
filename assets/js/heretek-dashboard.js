/**
 * Heretek Analytics — Telemetry Augur Dashboard Controller.
 *
 * Drives the reactive Blood & Steel analytics cockpit: ApexCharts visualizations,
 * zero-reload REST/AJAX data fetching, date-range presets, live stream polling,
 * author ranking, and CSV/JSON export.
 *
 * @version 12.2.0
 */

(function () {
	'use strict';

	// Check for configuration object
	if (typeof window.HeretekConfig === 'undefined') {
		console.warn('[Heretek Analytics] Configuration object not found.');
		return;
	}

	const config = window.HeretekConfig;

	const state = {
		preset: '30d',
		startDate: '',
		endDate: '',
		activeTab: 'overview',
		activeMetric: 'sessions',
		isLoading: false,
		isRealtimeActive: false,
		realtimeTimer: null,
		countdownTimer: null,
		countdownSeconds: 30,
		isLivePaused: false,
		currentData: null,
		realtimeData: null,
		charts: {},
	};

	// Formatters
	const fmt = {
		int: function (val) {
			val = parseInt(val, 10);
			if (isNaN(val)) return '0';
			if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
			if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
			return val.toLocaleString();
		},
		seconds: function (sec) {
			sec = Math.round(Number(sec) || 0);
			const m = Math.floor(sec / 60);
			const s = sec % 60;
			return m + 'm ' + (s < 10 ? '0' : '') + s + 's';
		},
		percent: function (val) {
			const n = Number(val) || 0;
			return n.toFixed(1) + '%';
		},
		delta: function (val) {
			const n = Number(val) || 0;
			const sign = n > 0 ? '+' : '';
			return sign + n.toFixed(1) + '%';
		},
		dateLabel: function (str) {
			if (typeof str === 'string' && str.length === 8) {
				return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
			}
			return str;
		},
	};

	// Date helpers
	function computePresetDates(preset) {
		const today = new Date();
		const end = new Date(today);
		let start = new Date(today);

		if (preset === 'today') {
			// start = today, end = today
		} else if (preset === 'yesterday') {
			start.setDate(today.getDate() - 1);
			end.setDate(today.getDate() - 1);
		} else if (preset === '7d') {
			start.setDate(today.getDate() - 6);
		} else if (preset === '30d') {
			start.setDate(today.getDate() - 29);
		} else if (preset === '90d') {
			start.setDate(today.getDate() - 89);
		}

		const toISO = function (d) {
			return d.toISOString().split('T')[0];
		};

		return {
			start: toISO(start),
			end: toISO(end),
		};
	}

	// Document Ready
	document.addEventListener('DOMContentLoaded', function () {
		initDashboard();
	});

	function initDashboard() {
		// Only initialize on pages that include the interactive reports dashboard container
		if (!document.getElementById('htk-main-chart')) {
			return;
		}

		bindEvents();

		// Determine initial dates
		const initialStart = document.getElementById('htk-input-start');
		const initialEnd = document.getElementById('htk-input-end');

		if (initialStart && initialStart.value && initialEnd && initialEnd.value) {
			state.startDate = initialStart.value;
			state.endDate = initialEnd.value;
		} else {
			const dates = computePresetDates('30d');
			state.startDate = dates.start;
			state.endDate = dates.end;
			if (initialStart) initialStart.value = dates.start;
			if (initialEnd) initialEnd.value = dates.end;
		}

		// If initial data was passed from SSR, render immediately
		if (config.initialData && config.initialData.kpis) {
			state.currentData = config.initialData;
			renderDashboard(config.initialData);
		} else if (config.isConfigured) {
			fetchDashboardData(false);
		}
	}

	function bindEvents() {
		// Presets
		const presetBtns = document.querySelectorAll('.htk-preset-btn');
		presetBtns.forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				const p = this.getAttribute('data-preset');
				if (p === 'custom') {
					document.getElementById('htk-custom-dates-wrap').style.display = 'inline-flex';
					presetBtns.forEach(b => b.classList.remove('active'));
					this.classList.add('active');
					state.preset = 'custom';
					return;
				}

				presetBtns.forEach(b => b.classList.remove('active'));
				this.classList.add('active');
				const wrap = document.getElementById('htk-custom-dates-wrap');
				if (wrap) wrap.style.display = 'none';

				state.preset = p;
				const dates = computePresetDates(p);
				state.startDate = dates.start;
				state.endDate = dates.end;

				const startInput = document.getElementById('htk-input-start');
				const endInput = document.getElementById('htk-input-end');
				if (startInput) startInput.value = dates.start;
				if (endInput) endInput.value = dates.end;

				fetchDashboardData(false);
			});
		});

		// Custom date apply
		const btnApply = document.getElementById('htk-btn-apply');
		if (btnApply) {
			btnApply.addEventListener('click', function (e) {
				e.preventDefault();
				const s = document.getElementById('htk-input-start').value;
				const end = document.getElementById('htk-input-end').value;
				if (s && end) {
					state.startDate = s;
					state.endDate = end;
					state.preset = 'custom';
					fetchDashboardData(false);
				}
			});
		}

		// Force sync button
		const btnSync = document.getElementById('htk-btn-sync');
		if (btnSync) {
			btnSync.addEventListener('click', function (e) {
				e.preventDefault();
				if (state.activeTab === 'realtime') {
					fetchRealtimeData(true);
				} else {
					fetchDashboardData(true);
				}
			});
		}

		// Nav Tabs (Reports cockpit tab panes with data-tab only)
		const tabLinks = document.querySelectorAll('.htk-nav-tab[data-tab]');
		tabLinks.forEach(function (tab) {
			tab.addEventListener('click', function (e) {
				const target = this.getAttribute('data-tab');
				if (target) {
					e.preventDefault();
					switchTab(target);
				}
			});
		});

		// Metric Switchers on Main Chart
		const metricPills = document.querySelectorAll('.htk-metric-pill');
		metricPills.forEach(function (pill) {
			pill.addEventListener('click', function () {
				metricPills.forEach(p => p.classList.remove('active'));
				this.classList.add('active');
				const metric = this.getAttribute('data-metric');
				state.activeMetric = metric;
				renderMainChart(state.currentData);
			});
		});

		// Realtime live controls (Pause / Resume)
		const btnPause = document.getElementById('htk-btn-realtime-pause');
		if (btnPause) {
			btnPause.addEventListener('click', function () {
				state.isLivePaused = !state.isLivePaused;
				this.textContent = state.isLivePaused ? '▶ Resume Telemetry' : '⏸ Pause Stream';
				if (!state.isLivePaused) {
					fetchRealtimeData(true);
				}
			});
		}

		// Export triggers
		const exportBtns = document.querySelectorAll('.htk-export-btn');
		exportBtns.forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				const format = this.getAttribute('data-format') || 'csv';
				const tableId = this.getAttribute('data-table');
				exportTable(tableId, format);
			});
		});
	}

	function switchTab(tabId) {
		state.activeTab = tabId;

		document.querySelectorAll('.htk-nav-tab[data-tab]').forEach(function (t) {
			t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
		});

		document.querySelectorAll('.htk-tab-pane').forEach(function (pane) {
			pane.style.display = pane.id === 'htk-pane-' + tabId ? 'block' : 'none';
		});

		// Handle realtime stream cycle
		if (tabId === 'realtime') {
			startRealtimePolling();
		} else {
			stopRealtimePolling();
			// Re-render charts on current tab to fix dimensions if resized
			if (state.currentData) {
				renderDashboard(state.currentData);
			}
		}
	}

	// =========================================================================
	// Data Fetching Engine
	// =========================================================================
	function fetchDashboardData(forceRefresh) {
		if (state.isLoading) return;
		setLoading(true);

		const url = new URL(config.restUrl + 'dashboard');
		url.searchParams.set('start', state.startDate);
		url.searchParams.set('end', state.endDate);
		if (forceRefresh) {
			url.searchParams.set('force_refresh', 'true');
		}

		fetch(url.toString(), {
			method: 'GET',
			headers: {
				'X-WP-Nonce': config.restNonce,
				'Accept': 'application/json',
			},
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (response) {
				setLoading(false);
				if (response && response.data && response.data.kpis) {
					state.currentData = response.data;
					renderDashboard(response.data);
				} else if (response && response.data && response.data.error) {
					showError(response.data.error);
				} else {
					fallbackToAjaxDashboard(forceRefresh);
				}
			})
			.catch(function (err) {
				console.warn('[Heretek REST failed, trying AJAX fallback]', err);
				fallbackToAjaxDashboard(forceRefresh);
			});
	}

	function fallbackToAjaxDashboard(forceRefresh) {
		const formData = new FormData();
		formData.append('action', 'heretekanalytics_get_dashboard_telemetry');
		formData.append('nonce', config.ajaxNonce);
		formData.append('start', state.startDate);
		formData.append('end', state.endDate);
		if (forceRefresh) formData.append('force_refresh', 'true');

		fetch(config.ajaxUrl, {
			method: 'POST',
			body: formData,
		})
			.then(res => res.json())
			.then(function (response) {
				setLoading(false);
				if (response && response.success && response.data) {
					state.currentData = response.data;
					renderDashboard(response.data);
				} else {
					const msg = (response && response.data && response.data.error) || 'Failed to fetch GA4 telemetry.';
					showError(msg);
				}
			})
			.catch(function (err) {
				setLoading(false);
				showError('Network error connecting to telemetry cogitator.');
			});
	}

	function setLoading(loading) {
		state.isLoading = loading;
		const syncBtn = document.getElementById('htk-btn-sync');
		if (syncBtn) {
			syncBtn.classList.toggle('syncing', loading);
		}
	}

	function showError(msg) {
		const alertBox = document.getElementById('htk-global-alert');
		if (alertBox) {
			alertBox.innerHTML = '<strong>GA4 Data API Diagnostic:</strong> ' + msg;
			alertBox.style.display = 'block';
		}
	}

	// =========================================================================
	// Dashboard Renderers
	// =========================================================================
	function renderDashboard(data) {
		if (!data) return;

		// Clear global alert if successful
		const alertBox = document.getElementById('htk-global-alert');
		if (alertBox && !data.error) {
			alertBox.style.display = 'none';
		} else if (alertBox && data.error) {
			alertBox.innerHTML = '<strong>GA4 Data API Notice:</strong> ' + data.error;
			alertBox.style.display = 'block';
		}

		// Update KPI cards
		renderKPIs(data.kpis);

		// Render Sparklines on KPI cards
		renderSparklines(data.reports && data.reports.overview);

		// Render Charts
		renderMainChart(data);
		renderChannelsChart(data.reports && data.reports.channels);
		renderDevicesChart(data.reports && data.reports.devices);

		// Render Tables
		renderTopPagesTable(data.reports && data.reports.top_pages);
		renderTopSourcesTable(data.reports && data.reports.top_sources);
		renderTopCountriesTable(data.reports && data.reports.top_countries);
		renderTopCitiesTable(data.reports && data.reports.top_cities);
		renderAuthorsLeaderboard(data.reports && data.reports.top_authors, data.author_lookup, data.is_hybrid_author);
		renderCharactersLeaderboard(data.reports && data.reports.top_characters);
		renderTechTables(data.reports);

		// Update timestamp
		const stamp = document.getElementById('htk-last-synced');
		if (stamp) {
			stamp.textContent = data.updated_at || new Date().toLocaleTimeString();
		}
	}

	function renderKPIs(kpis) {
		if (!kpis) return;

		const fields = [
			{ id: 'sessions', fmt: fmt.int, delta: true },
			{ id: 'users', fmt: fmt.int, delta: true },
			{ id: 'pageviews', fmt: fmt.int, delta: true },
			{ id: 'avg_duration', fmt: fmt.seconds, delta: true },
			{ id: 'engagement_rate', fmt: fmt.percent, delta: true },
			{ id: 'views_per_user', fmt: val => Number(val).toFixed(1), delta: true },
		];

		fields.forEach(function (f) {
			const item = kpis[f.id];
			if (!item) return;

			const valEl = document.getElementById('htk-kpi-' + f.id);
			if (valEl) {
				valEl.textContent = f.fmt(item.value);
			}

			const deltaEl = document.getElementById('htk-delta-' + f.id);
			if (deltaEl) {
				const d = Number(item.delta) || 0;
				deltaEl.textContent = fmt.delta(d);
				deltaEl.className = 'htk-delta-badge ' + (d > 0 ? 'pos' : (d < 0 ? 'neg' : 'neu'));
			}
		});
	}

	function renderSparklines(overview) {
		if (!overview || !overview.rows || !window.ApexCharts) return;

		const metricsMap = {
			'spark-sessions': 0,
			'spark-users': 1,
			'spark-pageviews': 2,
		};

		Object.keys(metricsMap).forEach(function (id) {
			const idx = metricsMap[id];
			const seriesData = overview.rows.map(r => Number(r.m[idx] && r.m[idx].value) || 0);
			const el = document.getElementById(id);
			if (!el) return;

			const options = {
				chart: {
					type: 'area',
					height: 36,
					sparkline: { enabled: true },
					animations: { enabled: false },
				},
				stroke: { curve: 'smooth', width: 2 },
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						opacityFrom: 0.45,
						opacityTo: 0.05,
						stops: [0, 90, 100],
						colorStops: [{ offset: 0, color: '#dc2626', opacity: 0.4 }, { offset: 100, color: '#dc2626', opacity: 0 }],
					},
				},
				colors: ['#dc2626'],
				series: [{ data: seriesData }],
				tooltip: { enabled: false },
			};

			if (state.charts[id]) {
				state.charts[id].updateOptions(options);
			} else {
				state.charts[id] = new ApexCharts(el, options);
				state.charts[id].render();
			}
		});
	}

	// =========================================================================
	// Interactive ApexCharts
	// =========================================================================
	function renderMainChart(data) {
		const overview = data && data.reports && data.reports.overview;
		const el = document.getElementById('htk-main-chart');
		if (!el || !overview || !overview.rows || !window.ApexCharts) return;

		const metricIndexMap = {
			sessions: { idx: 0, label: 'Sessions', color: '#dc2626' },
			users: { idx: 1, label: 'Total Users', color: '#ef4444' },
			pageviews: { idx: 2, label: 'Page Views', color: '#f87171' },
			engagement: { idx: 4, label: 'Engaged Sessions', color: '#10b981' },
		};

		const meta = metricIndexMap[state.activeMetric] || metricIndexMap.sessions;
		const categories = [];
		const values = [];

		overview.rows.forEach(function (r) {
			const dateRaw = r.d && r.d[0] ? String(r.d[0]) : '';
			categories.push(fmt.dateLabel(dateRaw));
			values.push(Number(r.m[meta.idx] && r.m[meta.idx].value) || 0);
		});

		const options = {
			chart: {
				type: 'area',
				height: 320,
				background: 'transparent',
				toolbar: { show: false },
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 500,
				},
			},
			theme: { mode: 'dark' },
			colors: [meta.color],
			stroke: {
				curve: 'smooth',
				width: 3,
			},
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.4,
					opacityTo: 0.02,
					stops: [0, 95, 100],
				},
			},
			dataLabels: { enabled: false },
			series: [{
				name: meta.label,
				data: values,
			}],
			xaxis: {
				categories: categories,
				labels: {
					style: { colors: '#94a3b8', fontSize: '11px', fontFamily: 'Geist, sans-serif' },
					rotate: -20,
				},
				axisBorder: { color: '#1e1e2d' },
				axisTicks: { color: '#1e1e2d' },
			},
			yaxis: {
				labels: {
					style: { colors: '#94a3b8', fontSize: '11px', fontFamily: 'Geist, monospace' },
					formatter: function (v) { return fmt.int(v); },
				},
			},
			grid: {
				borderColor: '#181826',
				strokeDashArray: 3,
			},
			tooltip: {
				theme: 'dark',
				y: {
					formatter: function (v) { return v.toLocaleString(); },
				},
			},
		};

		if (state.charts['mainChart']) {
			state.charts['mainChart'].updateOptions(options);
		} else {
			state.charts['mainChart'] = new ApexCharts(el, options);
			state.charts['mainChart'].render();
		}
	}

	function renderChannelsChart(channels) {
		const el = document.getElementById('htk-channels-chart');
		if (!el || !channels || !channels.rows || !window.ApexCharts) return;

		const labels = [];
		const series = [];

		channels.rows.forEach(function (r) {
			labels.push(r.d && r.d[0] ? r.d[0] : '(not set)');
			series.push(Number(r.m && r.m[0] && r.m[0].value) || 0);
		});

		if (series.length === 0) {
			el.innerHTML = '<p class="htk-alert htk-alert-empty">No acquisition data for this date range.</p>';
			return;
		}

		const options = {
			chart: {
				type: 'donut',
				height: 240,
				background: 'transparent',
			},
			theme: { mode: 'dark' },
			colors: ['#dc2626', '#ef4444', '#f87171', '#fb923c', '#fbbf24', '#34d399', '#38bdf8', '#818cf8'],
			labels: labels,
			series: series,
			dataLabels: { enabled: false },
			legend: {
				position: 'bottom',
				labels: { colors: '#94a3b8' },
				fontFamily: 'Geist, sans-serif',
			},
			stroke: { width: 1, colors: ['#0f0f16'] },
			tooltip: {
				theme: 'dark',
				y: { formatter: v => fmt.int(v) + ' sessions' },
			},
		};

		if (state.charts['channelsChart']) {
			state.charts['channelsChart'].updateOptions(options);
		} else {
			state.charts['channelsChart'] = new ApexCharts(el, options);
			state.charts['channelsChart'].render();
		}
	}

	function renderDevicesChart(devices) {
		const el = document.getElementById('htk-devices-chart');
		if (!el || !devices || !devices.rows || !window.ApexCharts) return;

		const labels = [];
		const series = [];

		devices.rows.forEach(function (r) {
			const cat = r.d && r.d[0] ? r.d[0] : 'other';
			labels.push(cat.charAt(0).toUpperCase() + cat.slice(1));
			series.push(Number(r.m && r.m[0] && r.m[0].value) || 0);
		});

		if (series.length === 0) {
			el.innerHTML = '<p class="htk-alert htk-alert-empty">No device data available.</p>';
			return;
		}

		const options = {
			chart: {
				type: 'donut',
				height: 240,
				background: 'transparent',
			},
			theme: { mode: 'dark' },
			colors: ['#dc2626', '#3b82f6', '#10b981', '#a855f7'],
			labels: labels,
			series: series,
			dataLabels: { enabled: false },
			legend: {
				position: 'bottom',
				labels: { colors: '#94a3b8' },
				fontFamily: 'Geist, sans-serif',
			},
			stroke: { width: 1, colors: ['#0f0f16'] },
			tooltip: {
				theme: 'dark',
				y: { formatter: v => fmt.int(v) + ' sessions' },
			},
		};

		if (state.charts['devicesChart']) {
			state.charts['devicesChart'].updateOptions(options);
		} else {
			state.charts['devicesChart'] = new ApexCharts(el, options);
			state.charts['devicesChart'].render();
		}
	}

	// =========================================================================
	// Table Renderers
	// =========================================================================
	function renderTopPagesTable(pages) {
		const tbody = document.getElementById('htk-tbody-pages');
		if (!tbody) return;

		if (!pages || !pages.rows || pages.rows.length === 0) {
			tbody.innerHTML = '<tr><td colspan="4" class="htk-alert htk-alert-empty">No page events recorded.</td></tr>';
			return;
		}

		let maxViews = 1;
		pages.rows.forEach(r => {
			const v = Number(r.m && r.m[0] && r.m[0].value) || 0;
			if (v > maxViews) maxViews = v;
		});

		let html = '';
		pages.rows.forEach(function (r, i) {
			const title = (r.d && r.d[0]) || '';
			const path = (r.d && r.d[1]) || '';
			const views = Number(r.m && r.m[0] && r.m[0].value) || 0;
			const users = Number(r.m && r.m[1] && r.m[1].value) || 0;
			const dur = Number(r.m && r.m[2] && r.m[2].value) || 0;
			const pct = Math.min(100, Math.round((views / maxViews) * 100));

			const displayTitle = title || path || '(not set)';

			html += '<tr>';
			html += '<td><div style="display:flex;align-items:flex-start;">' +
				'<span class="htk-rank-badge">' + (i + 1) + '</span>' +
				'<div style="max-width:380px;">' +
				'<a href="' + escapeHtml(path) + '" target="_blank" rel="noopener noreferrer" style="font-weight:600;">' + escapeHtml(displayTitle) + '</a>' +
				(path ? '<div class="htk-path-sub">' + escapeHtml(path) + '</div>' : '') +
				'<div class="htk-bar-track"><div class="htk-bar-fill" style="width:' + pct + '%;"></div></div>' +
				'</div></div></td>';
			html += '<td class="num">' + fmt.int(views) + '</td>';
			html += '<td class="num">' + fmt.int(users) + '</td>';
			html += '<td class="num">' + fmt.seconds(views > 0 ? dur / views : 0) + '</td>';
			html += '</tr>';
		});

		tbody.innerHTML = html;
	}

	function renderTopSourcesTable(sources) {
		const tbody = document.getElementById('htk-tbody-sources');
		if (!tbody) return;

		if (!sources || !sources.rows || sources.rows.length === 0) {
			tbody.innerHTML = '<tr><td colspan="3" class="htk-alert htk-alert-empty">No referrer sources recorded.</td></tr>';
			return;
		}

		let max = 1;
		sources.rows.forEach(r => {
			const s = Number(r.m && r.m[0] && r.m[0].value) || 0;
			if (s > max) max = s;
		});

		let html = '';
		sources.rows.forEach(function (r, i) {
			const source = (r.d && r.d[0]) || '(direct)';
			const medium = (r.d && r.d[1]) || '(none)';
			const sessions = Number(r.m && r.m[0] && r.m[0].value) || 0;
			const users = Number(r.m && r.m[1] && r.m[1].value) || 0;
			const pct = Math.min(100, Math.round((sessions / max) * 100));

			html += '<tr>';
			html += '<td><div style="display:flex;align-items:center;">' +
				'<span class="htk-rank-badge">' + (i + 1) + '</span>' +
				'<div style="flex:1;">' +
				'<span style="font-weight:600;">' + escapeHtml(source) + '</span>' +
				' <span style="font-size:11px;color:#71717a;">/ ' + escapeHtml(medium) + '</span>' +
				'<div class="htk-bar-track"><div class="htk-bar-fill" style="width:' + pct + '%;"></div></div>' +
				'</div></div></td>';
			html += '<td class="num">' + fmt.int(sessions) + '</td>';
			html += '<td class="num">' + fmt.int(users) + '</td>';
			html += '</tr>';
		});

		tbody.innerHTML = html;
	}

	function renderTopCountriesTable(countries) {
		const tbody = document.getElementById('htk-tbody-countries');
		if (!tbody) return;

		if (!countries || !countries.rows || countries.rows.length === 0) {
			tbody.innerHTML = '<tr><td colspan="3" class="htk-alert htk-alert-empty">No country telemetry recorded.</td></tr>';
			return;
		}

		let max = 1;
		countries.rows.forEach(r => {
			const s = Number(r.m && r.m[0] && r.m[0].value) || 0;
			if (s > max) max = s;
		});

		let html = '';
		countries.rows.forEach(function (r, i) {
			const country = (r.d && r.d[0]) || '(not set)';
			const sessions = Number(r.m && r.m[0] && r.m[0].value) || 0;
			const users = Number(r.m && r.m[1] && r.m[1].value) || 0;
			const pct = Math.min(100, Math.round((sessions / max) * 100));

			html += '<tr>';
			html += '<td><div style="display:flex;align-items:center;">' +
				'<span class="htk-rank-badge">' + (i + 1) + '</span>' +
				'<div style="flex:1;">' +
				'<span style="font-weight:600;">' + escapeHtml(country) + '</span>' +
				'<div class="htk-bar-track"><div class="htk-bar-fill" style="width:' + pct + '%;"></div></div>' +
				'</div></div></td>';
			html += '<td class="num">' + fmt.int(sessions) + '</td>';
			html += '<td class="num">' + fmt.int(users) + '</td>';
			html += '</tr>';
		});

		tbody.innerHTML = html;
	}

	function renderTopCitiesTable(cities) {
		const tbody = document.getElementById('htk-tbody-cities');
		if (!tbody) return;

		if (!cities || !cities.rows || cities.rows.length === 0) {
			tbody.innerHTML = '<tr><td colspan="2" class="htk-alert htk-alert-empty">No city telemetry recorded.</td></tr>';
			return;
		}

		let html = '';
		cities.rows.forEach(function (r, i) {
			const city = (r.d && r.d[0]) || '(not set)';
			const country = (r.d && r.d[1]) || '';
			const sessions = Number(r.m && r.m[0] && r.m[0].value) || 0;

			html += '<tr>';
			html += '<td><span class="htk-rank-badge">' + (i + 1) + '</span>' +
				'<strong>' + escapeHtml(city) + '</strong>' +
				(country ? ' <span style="font-size:11px;color:#71717a;">(' + escapeHtml(country) + ')</span>' : '') +
				'</td>';
			html += '<td class="num">' + fmt.int(sessions) + '</td>';
			html += '</tr>';
		});

		tbody.innerHTML = html;
	}

	function renderAuthorsLeaderboard(authors, lookup) {
		const tbody = document.getElementById('htk-tbody-authors');
		if (!tbody) return;

		if (!authors || !authors.rows || authors.rows.length === 0) {
			tbody.innerHTML = '<tr><td colspan="5" class="htk-alert htk-alert-empty">No author data captured in this window. Ensure GA4 custom dimension <code>author_id</code> is registered.</td></tr>';
			return;
		}

		lookup = lookup || {};
		let totalSessions = 0;
		authors.rows.forEach(r => {
			totalSessions += Number(r.m && r.m[0] && r.m[0].value) || 0;
		});

		let html = '';
		const chartLabels = [];
		const chartSeries = [];

		authors.rows.forEach(function (r, i) {
			const rawId = (r.d && r.d[0]) || '';
			const aid = (rawId && rawId !== '(not set)' && !isNaN(rawId)) ? parseInt(rawId, 10) : 0;
			const user = aid > 0 && lookup[aid] ? lookup[aid] : null;

			const sessions = Number(r.m && r.m[0] && r.m[0].value) || 0;
			const views = Number(r.m && r.m[1] && r.m[1].value) || 0;
			const users = Number(r.m && r.m[2] && r.m[2].value) || 0;
			const engaged = Number(r.m && r.m[3] && r.m[3].value) || 0;
			const share = totalSessions > 0 ? Math.round((sessions / totalSessions) * 100) : 0;

			let displayName = user ? user.name : (aid > 0 ? 'Author #' + aid : '(not set)');
			let email = user ? user.email : '';
			let avatar = user ? user.avatar : '';

			chartLabels.push(displayName);
			chartSeries.push(sessions);

			html += '<tr>';
			html += '<td><div class="htk-author-cell">' +
				'<span class="htk-rank-badge">' + (i + 1) + '</span>' +
				(avatar ? '<img class="htk-author-avatar" src="' + escapeHtml(avatar) + '" alt="">' : '') +
				'<div>' +
				(user && user.edit_url ? '<a href="' + escapeHtml(user.edit_url) + '" class="htk-author-meta-name">' + escapeHtml(displayName) + '</a>' : '<span class="htk-author-meta-name">' + escapeHtml(displayName) + '</span>') +
				(email ? '<div class="htk-author-meta-email">' + escapeHtml(email) + '</div>' : '') +
				'<div class="htk-bar-track"><div class="htk-bar-fill" style="width:' + share + '%;"></div></div>' +
				'</div></div></td>';
			html += '<td class="num">' + fmt.int(sessions) + '</td>';
			html += '<td class="num">' + fmt.int(views) + '</td>';
			html += '<td class="num">' + fmt.int(users) + '</td>';
			html += '<td class="num">' + fmt.percent(sessions > 0 ? (engaged / sessions) * 100 : 0) + '</td>';
			html += '</tr>';
		});

		tbody.innerHTML = html;

		// Render Authors Distribution Bar Chart
		const chartEl = document.getElementById('htk-authors-chart');
		if (chartEl && window.ApexCharts && chartLabels.length > 0) {
			const options = {
				chart: {
					type: 'bar',
					height: 280,
					background: 'transparent',
					toolbar: { show: false },
				},
				theme: { mode: 'dark' },
				colors: ['#dc2626'],
				plotOptions: {
					bar: {
						horizontal: true,
						borderRadius: 4,
						dataLabels: { position: 'top' },
					},
				},
				dataLabels: {
					enabled: true,
					formatter: val => fmt.int(val),
					offsetX: 30,
					style: { fontSize: '11px', fontFamily: 'Geist, monospace', colors: ['#e2e8f0'] },
				},
				series: [{ name: 'Sessions', data: chartSeries.slice(0, 10) }],
				xaxis: {
					categories: chartLabels.slice(0, 10),
					labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
				},
				yaxis: {
					labels: { style: { colors: '#f8fafc', fontSize: '12px' } },
				},
				grid: { borderColor: '#181826' },
			};

			if (state.charts['authorsChart']) {
				state.charts['authorsChart'].updateOptions(options);
			} else {
				state.charts['authorsChart'] = new ApexCharts(chartEl, options);
				state.charts['authorsChart'].render();
			}
		}
	}

	function renderCharactersLeaderboard(characters) {
		const card = document.getElementById('htk-card-characters');
		const tbody = document.getElementById('htk-tbody-characters');
		if (!card || !tbody) return;

		if (!characters || !characters.rows || characters.rows.length === 0) {
			card.style.display = 'none';
			return;
		}

		card.style.display = 'block';
		let html = '';
		characters.rows.forEach(function (r, i) {
			const name = (r.d && r.d[0]) || '';
			const sessions = Number(r.m && r.m[0] && r.m[0].value) || 0;
			const views = Number(r.m && r.m[1] && r.m[1].value) || 0;
			const users = Number(r.m && r.m[2] && r.m[2].value) || 0;
			const engaged = Number(r.m && r.m[3] && r.m[3].value) || 0;

			html += '<tr>';
			html += '<td><div class="htk-author-cell">' +
				'<span class="htk-rank-badge">' + (i + 1) + '</span>' +
				'<div><span class="htk-author-meta-name" style="color:var(--htk-crimson);font-weight:600;">' + escapeHtml(name) + '</span></div>' +
				'</div></td>';
			html += '<td class="num">' + fmt.int(sessions) + '</td>';
			html += '<td class="num">' + fmt.int(views) + '</td>';
			html += '<td class="num">' + fmt.int(users) + '</td>';
			html += '<td class="num">' + fmt.int(engaged) + '</td>';
			html += '</tr>';
		});
		tbody.innerHTML = html;
	}

	function renderTechTables(reports) {
		if (!reports) return;

		// Browsers table
		const tbodyBrowsers = document.getElementById('htk-tbody-browsers');
		if (tbodyBrowsers && reports.browsers && reports.browsers.rows) {
			let html = '';
			reports.browsers.rows.forEach(function (r, i) {
				const b = (r.d && r.d[0]) || '(unknown)';
				const s = Number(r.m && r.m[0] && r.m[0].value) || 0;
				html += '<tr><td><span class="htk-rank-badge">' + (i + 1) + '</span>' + escapeHtml(b) + '</td><td class="num">' + fmt.int(s) + '</td></tr>';
			});
			tbodyBrowsers.innerHTML = html || '<tr><td colspan="2">No browser data.</td></tr>';
		}

		// OS table
		const tbodyOS = document.getElementById('htk-tbody-os');
		if (tbodyOS && reports.operating_systems && reports.operating_systems.rows) {
			let html = '';
			reports.operating_systems.rows.forEach(function (r, i) {
				const os = (r.d && r.d[0]) || '(unknown)';
				const s = Number(r.m && r.m[0] && r.m[0].value) || 0;
				html += '<tr><td><span class="htk-rank-badge">' + (i + 1) + '</span>' + escapeHtml(os) + '</td><td class="num">' + fmt.int(s) + '</td></tr>';
			});
			tbodyOS.innerHTML = html || '<tr><td colspan="2">No OS data.</td></tr>';
		}
	}

	// =========================================================================
	// Realtime Stream Engine
	// =========================================================================
	function startRealtimePolling() {
		state.isRealtimeActive = true;
		state.isLivePaused = false;
		fetchRealtimeData(false);

		if (state.realtimeTimer) clearInterval(state.realtimeTimer);
		state.realtimeTimer = setInterval(function () {
			if (!state.isLivePaused && state.activeTab === 'realtime') {
				fetchRealtimeData(false);
			}
		}, 30000);

		// Countdown tick
		state.countdownSeconds = 30;
		if (state.countdownTimer) clearInterval(state.countdownTimer);
		state.countdownTimer = setInterval(function () {
			if (!state.isLivePaused && state.activeTab === 'realtime') {
				state.countdownSeconds--;
				if (state.countdownSeconds <= 0) state.countdownSeconds = 30;
				const cdEl = document.getElementById('htk-realtime-countdown');
				if (cdEl) cdEl.textContent = state.countdownSeconds + 's';
			}
		}, 1000);
	}

	function stopRealtimePolling() {
		state.isRealtimeActive = false;
		if (state.realtimeTimer) clearInterval(state.realtimeTimer);
		if (state.countdownTimer) clearInterval(state.countdownTimer);
	}

	function fetchRealtimeData(forceRefresh) {
		const url = new URL(config.restUrl + 'realtime');
		if (forceRefresh) url.searchParams.set('force_refresh', 'true');

		fetch(url.toString(), {
			method: 'GET',
			headers: {
				'X-WP-Nonce': config.restNonce,
				'Accept': 'application/json',
			},
		})
			.then(res => res.json())
			.then(function (response) {
				if (response && response.data && typeof response.data.active_users !== 'undefined') {
					state.realtimeData = response.data;
					renderRealtime(response.data);
				} else {
					fallbackToAjaxRealtime(forceRefresh);
				}
			})
			.catch(function (err) {
				console.warn('[Heretek Realtime REST error, trying AJAX fallback]', err);
				fallbackToAjaxRealtime(forceRefresh);
			});
	}

	function fallbackToAjaxRealtime(forceRefresh) {
		const formData = new FormData();
		formData.append('action', 'heretekanalytics_get_realtime_telemetry');
		formData.append('nonce', config.ajaxNonce);
		if (forceRefresh) formData.append('force_refresh', 'true');

		fetch(config.ajaxUrl, {
			method: 'POST',
			body: formData,
		})
			.then(res => res.json())
			.then(function (response) {
				if (response && response.success && response.data) {
					state.realtimeData = response.data;
					renderRealtime(response.data);
				}
			})
			.catch(err => console.error('[Realtime AJAX Error]', err));
	}

	function renderRealtime(data) {
		if (!data) return;

		// Active Users counter
		const countEl = document.getElementById('htk-realtime-active-users');
		if (countEl) {
			countEl.textContent = Number(data.active_users).toLocaleString();
		}

		// Minute-by-minute bar chart (30 minutes)
		const chartEl = document.getElementById('htk-realtime-chart');
		if (chartEl && window.ApexCharts) {
			const minuteMap = {};
			for (let i = 29; i >= 0; i--) {
				minuteMap[i] = 0;
			}
			if (data.minutes && Array.isArray(data.minutes)) {
				data.minutes.forEach(function (r) {
					const min = parseInt(r.d && r.d[0], 10);
					const val = parseInt(r.m && r.m[0] && r.m[0].value, 10) || 0;
					if (!isNaN(min) && min >= 0 && min < 30) {
						minuteMap[min] = val;
					}
				});
			}

			const categories = [];
			const values = [];
			for (let i = 29; i >= 0; i--) {
				categories.push(i === 0 ? 'Now' : i + 'm');
				values.push(minuteMap[i]);
			}

			const options = {
				chart: {
					type: 'bar',
					height: 180,
					background: 'transparent',
					toolbar: { show: false },
					animations: { enabled: true, dynamicAnimation: { speed: 300 } },
				},
				theme: { mode: 'dark' },
				colors: ['#dc2626'],
				plotOptions: {
					bar: {
						columnWidth: '65%',
						borderRadius: 2,
					},
				},
				dataLabels: { enabled: false },
				series: [{ name: 'Active Users', data: values }],
				xaxis: {
					categories: categories,
					labels: {
						style: { colors: '#94a3b8', fontSize: '10px' },
						rotate: -45,
					},
				},
				yaxis: {
					labels: { style: { colors: '#94a3b8', fontSize: '10px' } },
				},
				grid: { borderColor: '#181826' },
			};

			if (state.charts['realtimeChart']) {
				state.charts['realtimeChart'].updateOptions(options);
			} else {
				state.charts['realtimeChart'] = new ApexCharts(chartEl, options);
				state.charts['realtimeChart'].render();
			}
		}

		// Realtime Pages
		const tbodyPages = document.getElementById('htk-tbody-realtime-pages');
		if (tbodyPages) {
			if (!data.pages || data.pages.length === 0) {
				tbodyPages.innerHTML = '<tr><td colspan="2" class="htk-alert htk-alert-empty">No active pageviews right now.</td></tr>';
			} else {
				let html = '';
				data.pages.forEach(function (r, i) {
					const page = (r.d && r.d[0]) || '(homepage)';
					const views = Number(r.m && r.m[0] && r.m[0].value) || 0;
					html += '<tr><td><span class="htk-rank-badge">' + (i + 1) + '</span>' + escapeHtml(page) + '</td><td class="num">' + fmt.int(views) + '</td></tr>';
				});
				tbodyPages.innerHTML = html;
			}
		}

		// Realtime Countries
		const tbodyCountries = document.getElementById('htk-tbody-realtime-countries');
		if (tbodyCountries) {
			if (!data.countries || data.countries.length === 0) {
				tbodyCountries.innerHTML = '<tr><td colspan="2" class="htk-alert htk-alert-empty">No active countries right now.</td></tr>';
			} else {
				let html = '';
				data.countries.forEach(function (r, i) {
					const c = (r.d && r.d[0]) || '(not set)';
					const users = Number(r.m && r.m[0] && r.m[0].value) || 0;
					html += '<tr><td><span class="htk-rank-badge">' + (i + 1) + '</span>' + escapeHtml(c) + '</td><td class="num">' + fmt.int(users) + '</td></tr>';
				});
				tbodyCountries.innerHTML = html;
			}
		}
	}

	// =========================================================================
	// Export Utilities (CSV / JSON)
	// =========================================================================
	function exportTable(tableId, format) {
		const table = document.getElementById(tableId);
		if (!table) return;

		const rows = Array.from(table.querySelectorAll('tr'));
		if (rows.length === 0) return;

		const data = [];
		rows.forEach(function (r) {
			const cells = Array.from(r.querySelectorAll('th, td'));
			const rowData = cells.map(c => c.innerText.replace(/\s+/g, ' ').trim());
			if (rowData.length > 0) data.push(rowData);
		});

		const filename = 'heretek-' + tableId + '-' + state.startDate + '-to-' + state.endDate;

		if (format === 'json') {
			const headers = data[0];
			const jsonArray = [];
			for (let i = 1; i < data.length; i++) {
				const obj = {};
				for (let j = 0; j < headers.length; j++) {
					obj[headers[j] || 'col_' + j] = data[i][j];
				}
				jsonArray.push(obj);
			}
			downloadBlob(JSON.stringify(jsonArray, null, 2), filename + '.json', 'application/json');
		} else {
			// CSV
			const csv = data.map(function (row) {
				return row.map(val => '"' + val.replace(/"/g, '""') + '"').join(',');
			}).join('\n');
			downloadBlob(csv, filename + '.csv', 'text/csv;charset=utf-8;');
		}
	}

	function downloadBlob(content, filename, contentType) {
		const blob = new Blob([content], { type: contentType });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function escapeHtml(str) {
		if (typeof str !== 'string') return '';
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

})();
