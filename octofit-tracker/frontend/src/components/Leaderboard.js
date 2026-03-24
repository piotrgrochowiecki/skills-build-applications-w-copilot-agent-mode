import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/leaderboards/`;
    console.log('Leaderboard: fetching from', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setEntries(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const medalColors = ['warning', 'secondary', 'danger'];
  const medals = ['🥇', '🥈', '🥉'];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading leaderboard&hellip;</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        <strong>Error loading leaderboard:</strong> {error}
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <span className="badge bg-light text-dark">{entries.length} team{entries.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="card-body p-0">
        {entries.length === 0 ? (
          <div className="alert alert-info m-3" role="alert">No leaderboard entries found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id || entry.id} className={index === 0 ? 'table-warning fw-bold' : ''}>
                    <td>
                      {index < 3
                        ? <span className={`badge bg-${medalColors[index]}`}>{medals[index]} {index + 1}</span>
                        : <span className="text-muted">{index + 1}</span>}
                    </td>
                    <td>{entry.team}</td>
                    <td><span className="badge bg-success fs-6">{entry.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
