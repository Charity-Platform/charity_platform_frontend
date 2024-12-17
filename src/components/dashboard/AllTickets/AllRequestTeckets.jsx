import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';

const AllRequestTickets = () => {
  const [tickets, setTickets] = useState([]); // State for tickets
  const [fields, setFields] = useState([]); // State for fields (categories)
  const [owners, setOwners] = useState({}); // State for owner data
  const [selectedField, setSelectedField] = useState(''); // State for selected field filter
  const [filterText, setFilterText] = useState(''); // Word-based filter input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch available fields (categories) for filtering
  const fetchFields = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`);
      if (response.data && response.data.document) {
        setFields(response.data.document);
      } else {
        setFields([]);
        setError('No available fields to display.');
      }
    } catch (error) {
      setError('Error fetching fields.');
    }
  };

  // Fetch tickets from API using query parameters
  const fetchTickets = async (field) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}tickets/field`, {
        params: { field }, // Send 'field' as query parameter
      });

      if (response.data && Array.isArray(response.data)) {
        setTickets(response.data);
        await fetchOwners(response.data); // Fetch owner data after tickets are retrieved
      } else {
        setTickets([]);
        setError('No tickets found.');
      }
    } catch (error) {
      setError('Error fetching tickets.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch owner data based on ticket owners
  const fetchOwners = async (tickets) => {
    try {
      const ownerIds = tickets.map((ticket) => ticket.owner);
      const uniqueOwnerIds = [...new Set(ownerIds)]; // Remove duplicates

      const ownerRequests = uniqueOwnerIds.map((id) =>
        axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${id}`) // Fetch mentor data
      );

      const ownerResponses = await Promise.all(ownerRequests);
      const ownerMap = {};

      ownerResponses.forEach((response) => {
        if (response.data && response.data.data && response.data.data.name) {
          ownerMap[response.data.data._id] = response.data.data.name;
        }
      });

      setOwners(ownerMap); // Set the owners state
    } catch (error) {
      setError('Error fetching owners.');
    }
  };

  // Trigger fetching fields on component mount
  useEffect(() => {
    fetchFields();
  }, []);

  // Trigger fetching tickets when the selected field changes
  useEffect(() => {
    if (selectedField) {
      fetchTickets(selectedField);
    }
  }, [selectedField]);

  // Filter tickets based on user input text (e.g., title)
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">All Request Tickets</h2>

      {/* Display error if it exists */}
      {error && <p className="error-message text-danger text-center">Error: {error}</p>}

      {/* Loading spinner */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Field Filter Dropdown */}
      <Form.Group controlId="fieldFilter" className="mb-3">
        <Form.Label>Select a Field</Form.Label>
        <Form.Select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select a field...</option>
          {fields.length > 0 ? (
            fields.map((field) => (
              <option key={field._id} value={field.name}>
                {field.name}
              </option>
            ))
          ) : (
            <option disabled>No fields available</option>
          )}
        </Form.Select>
      </Form.Group>

      {/* Text Filter Input */}
      <Form.Group controlId="wordFilter" className="mb-4">
        <Form.Label>Filter by Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter words to filter..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Form.Group>

      {/* Ticket Cards */}
      <Row className="justify-content-center">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Col md={4} lg={3} key={ticket._id} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Text>
                    <strong>Duration:</strong> {ticket.duration} minutes<br />
                    <strong>Start Time:</strong> {ticket.startDate}<br />
                    <strong>Price:</strong> ${ticket.price}<br />
                    <strong>Type:</strong> {ticket.type}<br />
                    <strong>Active:</strong> {ticket.isActive ? 'Yes' : 'No'}<br />
                    <strong>Owner:</strong> {owners[ticket.owner] || 'Unknown'}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No tickets found for this filter.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AllRequestTickets;
