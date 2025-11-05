import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import api from '../api';
import AddGoalForm from '../components/AddGoalForm';
import GoalList from '../components/GoalList';
import AppreciationModal from '../components/AppreciationModal';
import clickSound from '../sounds/click.mp3';
import chimeSound from '../sounds/chime.mp3';

export default function Dashboard({ token }) {
  const [goals, setGoals] = useState([]);
  const [summary, setSummary] = useState({ total: 0, completed: 0, allDone: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [viewMode, setViewMode] = useState('today');

  const clickAudio = useRef(null);
  const chimeAudio = useRef(null);

  useEffect(() => {
    clickAudio.current = new Audio(clickSound);
    chimeAudio.current = new Audio(chimeSound);
  }, []);

  const playClick = () => { try { clickAudio.current?.play(); } catch (err) {} };
  const playChime = () => { try { chimeAudio.current?.play(); } catch (err) {} };

  const fetchGoals = async (mode = 'today') => {
    try {
      const endpoint =
        mode === 'today'
          ? '/goals'
          : mode === 'previous'
          ? '/goals/previous'
          : '/goals/all';
      const res = await api.getGoals(endpoint);
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await api.dailySummary();
      setSummary({
        total: res.data.total,
        completed: res.data.completed,
        allDone: res.data.allDone,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await api.getGoals('/goals/progress');
      setChartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGoals();
      fetchSummary();
      fetchChartData();
    }
  }, [token]);

  const handleCreate = async (payload) => {
    playClick();
    try {
      await api.createGoal(payload);
      await fetchGoals(viewMode);
      await fetchSummary();
      await fetchChartData();
    } catch {
      alert('Create failed');
    }
  };

  const handleUpdate = async (id, body) => {
    playClick();
    try {
      await api.updateGoal(id, body);
      await fetchGoals(viewMode);
      await fetchSummary();
      await fetchChartData();
    } catch {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    playClick();
    if (!window.confirm('Delete goal?')) return;
    try {
      await api.deleteGoal(id);
      await fetchGoals(viewMode);
      await fetchSummary();
      await fetchChartData();
    } catch {
      alert('Delete failed');
    }
  };

  const handleEOD = async () => {
    playClick();
    await fetchSummary();
    if (summary.allDone) playChime();
    setModalOpen(true);
  };

  const handleViewChange = (mode) => {
    playClick();
    setViewMode(mode);
    fetchGoals(mode);
  };

  return (
    <div
      style={{
        background:  'linear-gradient(135deg, #f178f5ff, #97eff4ff)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '50px 0',
    fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container" style={{ maxWidth: 1150 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>

          {/* SECTION 1 - Add + View Goals */}
          <div style={{ flex: 1, minWidth: 380 }}>
            <div className="card pretty-card">
              <h2 style={{ color: '#d63384' }}>🎯 Manage Your Goals</h2>
              <AddGoalForm onCreate={handleCreate} />

              <div className="view-switch" style={{ marginTop: 20 }}>
                <h4 style={{ color: '#c767a7', marginBottom: 10 }}>📅 View Goals</h4>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['today', 'previous', 'all'].map((m) => (
                    <button
                      key={m}
                      className={`cute-btn ${viewMode === m ? 'active' : ''}`}
                      onClick={() => handleViewChange(m)}
                    >
                      {m === 'today'
                        ? 'Today'
                        : m === 'previous'
                        ? 'Previous Days'
                        : 'All Goals'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 15 }}>
                <GoalList goals={goals} onUpdate={handleUpdate} onDelete={handleDelete} />
              </div>
            </div>
          </div>

          {/* SECTION 2 - Dashboard, Summary & Chart */}
          <div style={{ flex: 1, minWidth: 380 }}>
            <div className="card pretty-card">
              <h3 style={{ color: '#a64ca6' }}>💖 Dashboard Summary</h3>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <div className="pill">Completed: {summary.completed}</div>
                <div className="pill">Total Today: {summary.total}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div className="small" style={{ color: '#999' }}>
                  🌷 Keep going! Hover over the chart points to see your daily progress.
                </div>
              </div>
             <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  }}
>
  {/* Sticky Notes Button */}
  <button
    className="cute-btn"
    style={{
      background: 'linear-gradient(135deg, #b86bba, #e2a9e5)',
      boxShadow: '0 4px 10px rgba(184, 107, 186, 0.3)',
    }}
    onClick={() => (window.location.href = '/notes')}
  >
    🗒️ Sticky Notes
  </button>

  {/* End of Day Button */}
  <button className="cute-btn" onClick={handleEOD}>
    🌙 End of Day
  </button>
</div>

            </div>

            {/* Chart Section */}
            <div style={{ marginTop: 20 }} className="card pretty-card">
              <h3 style={{ color: '#a64ca6' }}>📈 Progress Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0b7d4" />
                  <XAxis dataKey="date" tick={{ fill: '#b86bba' }} />
                  <YAxis tick={{ fill: '#b86bba' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff0f6',
                      borderRadius: '10px',
                      border: '1px solid #f8c5e6',
                    }}
                    formatter={(value, name) =>
                      name === 'completed'
                        ? [`${value} goals done`, 'Completed']
                        : [`${value} goals set`, 'Total']
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#f8a5c2"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#b86bba"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <AppreciationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        allDone={summary.allDone}
        total={summary.total}
        completed={summary.completed}
      />

      <style jsx>{`
        .pretty-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.2);
          padding: 20px;
          transition: all 0.3s ease;
        }
        .pretty-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(255, 182, 193, 0.4);
        }
        .cute-btn {
          background: linear-gradient(135deg, #f78fb3, #fbc2eb);
          border: none;
          color: white;
          padding: 10px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        .cute-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(255, 105, 180, 0.3);
        }
        .cute-btn.active {
          background: linear-gradient(135deg, #b86bba, #e2a9e5);
          box-shadow: 0 4px 12px rgba(184, 107, 186, 0.4);
        }
        .pill {
          background: #ffe4ec;
          color: #d63384;
          border-radius: 20px;
          padding: 6px 14px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
