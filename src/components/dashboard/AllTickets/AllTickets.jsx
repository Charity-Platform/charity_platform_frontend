import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner, Modal } from 'react-bootstrap';
import '../DashBoard.css'; // Custom CSS for the ticket layout

const AllTickets = () => {
  const [tickets, setTickets] = useState([]); // State for tickets
  const [owners, setOwners] = useState({}); // State for owner data
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // Loading state
  const [showDetailsModal, setShowDetailsModal] = useState(false); // For displaying details modal
  const [selectedTicket, setSelectedTicket] = useState(null); // To store selected ticket details

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
          setError(response.data?.message || 'Error fetching tickets.');
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Unknown error occurred.');
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    // Fetch owner data based on ticket owners
    const fetchOwners = async (tickets) => {
      try {
        const ownerIds = tickets.map((ticket) => ticket.owner?._id); // Fetch owner's _id
        const uniqueOwnerIds = [...new Set(ownerIds)]; // Remove duplicates

        const ownerRequests = uniqueOwnerIds.map((id) =>
          axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${id}`, { withCredentials: true }) // Correct URL
        );

        const ownerResponses = await Promise.all(ownerRequests);
        const ownerMap = {};

        ownerResponses.forEach((response) => {
          const ownerData = response.data?.data;
          if (ownerData?.name) {
            ownerMap[ownerData._id] = ownerData.name; // Map owner ID to owner name
          }
        });

        setOwners(ownerMap); // Set the owners state
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Error fetching owner data.');
      }
    };

    fetchTickets();
  }, []);

  // Handle modal display for ticket details
  const handleShowDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true); // Show the modal
  };

  // Handle modal close
  const handleCloseDetails = () => {
    setShowDetailsModal(false); // Hide the modal
    setSelectedTicket(null); // Clear selected ticket
  };

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
      {error && (
        <p className="error-message text-danger text-center">
          Error fetching tickets: {typeof error === 'string' ? error : JSON.stringify(error)}
        </p>
      )}

      {/* Tickets container */}
      <div className="ticket-container d-flex flex-wrap justify-content-center">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Card key={ticket._id} className="ticket-card mx-2 my-2" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{ticket.title}</Card.Title>
                <Card.Text>
                  <strong>Duration:</strong> {ticket.duration} minutes<br />
                  <strong>Start Time:</strong> {ticket.startDate}<br />
                  <strong>Price:</strong> {ticket.price} دينار<br />
                  <strong>Type:</strong> {ticket.type}<br />
                  <strong>Day:</strong> {new Date(ticket.day).toLocaleDateString()}<br />
                  <strong>Active:</strong> {ticket.isActive ? 'Yes' : 'No'}<br />
                  <strong>Owner:</strong> {owners[ticket.owner?._id] || 'Unknown'}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShowDetails(ticket)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center">No tickets found.</p>
        )}
      </div>

      {/* Modal for displaying ticket details */}
      {selectedTicket && (
        <Modal show={showDetailsModal} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Title:</strong> {selectedTicket.title}<br />
            <strong>Duration:</strong> {selectedTicket.duration} minutes<br />
            <strong>Start Time:</strong> {selectedTicket.startDate}<br />
            <strong>Price:</strong> {selectedTicket.price} دينار<br />
            <strong>Type:</strong> {selectedTicket.type}<br />
            <strong>Day:</strong> {new Date(selectedTicket.day).toLocaleDateString()}<br />
            <strong>Active:</strong> {selectedTicket.isActive ? 'Yes' : 'No'}<br />
            <strong>Owner:</strong> {owners[selectedTicket.owner?._id] || 'Unknown'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AllTickets;
