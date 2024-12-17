import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';
import '../DashBoard.css'; // Custom CSS for the ticket layout

const AllTickets = () => {
  const [tickets, setTickets] = useState([]); // State for tickets
  const [owners, setOwners] = useState({}); // State for owner data
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all tickets and owners
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_MAIN_URL}tickets/field`; // Adjust URL as necessary
        const response = await axios.get(apiUrl, { withCredentials: true });

        if (response.data && response.data.data) {
          setTickets(response.data.data);
          await fetchOwners(response.data.data); // Fetch owner data after tickets are retrieved
        } else {
          setError(response.data.message || 'Error fetching tickets.');
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    // Fetch owner data based on ticket owners
    const fetchOwners = async (tickets) => {
      try {
        const ownerIds = tickets.map(ticket => ticket.owner);
        const uniqueOwnerIds = [...new Set(ownerIds)]; // Remove duplicates

        const ownerRequests = uniqueOwnerIds.map(id => 
          axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${id}`) // Fetch mentor data
        );

        const ownerResponses = await Promise.all(ownerRequests);
        const ownerMap = {};

        ownerResponses.forEach(response => {
          if (response.data && response.data.data && response.data.data.name) {
            ownerMap[response.data.data._id] = response.data.data.name; // Create a mapping of owner ID to owner name
          } else {
            console.error(`Owner not found for ID: ${response.data.data._id}`);
          }
        });

        setOwners(ownerMap); // Set the owners state
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="all-tickets-container">
      <h2 className="text-center my-4">All Tickets</h2>

      {/* Display loading spinner while fetching */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Display error if it exists */}
      {error && <p className="error-message text-danger text-center">Error fetching tickets: {error}</p>}

      {/* Tickets container */}
      <div className="ticket-container d-flex flex-wrap justify-content-center">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <Card key={ticket._id} className="ticket-card mx-2 my-2" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{ticket.title}</Card.Title>
                <Card.Text>
                  <strong>Duration:</strong> {ticket.duration} minutes<br />
                  <strong>Start Time:</strong> {ticket.startDate}<br />
                  <strong>Price:</strong> ${ticket.price}<br />
                  <strong>Type:</strong> {ticket.type}<br />
                  <strong>Day:</strong> {new Date(ticket.day).toLocaleDateString()}<br />
                  <strong>Active:</strong> {ticket.isActive ? 'Yes' : 'No'}<br />
                  <strong>Owner:</strong> {owners[ticket.owner] || 'Unknown'} {/* Display owner name */}
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
