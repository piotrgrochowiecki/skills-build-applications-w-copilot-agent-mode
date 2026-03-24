import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/activities/`;
    console.log('Activities: fetching from', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading activities&hellip;</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        <strong>Error loading activities:</strong> {error}
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2 className="mb-0">🏃 Activities</h2>
        <span className="badge bg-light text-dark">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="alert alert-info m-3" role="alert">No activities found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity._id || activity.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td>{activity.user}</td>
                    <td><span className="badge bg-primary">{activity.type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
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

export default Activities;
