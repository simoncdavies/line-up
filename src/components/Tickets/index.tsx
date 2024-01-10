import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../store';
import styled from 'styled-components';
import { fetchTickets } from '../../reducers/tickets';
import TicketRow from '../TicketRow';

const Tickets = () => {
  const dispatch = useAppDispatch();
  const ticketsList:any = useSelector((state: RootState) => state.ticketsReducer.tickets)
  const ticketsLoading = useSelector((state: RootState) => state.ticketsReducer.loading);
  const ticketsError = useSelector((state: RootState) => state.ticketsReducer.error);

  useEffect(() => {
    // hardcoded performanceID, would be passed in as prop or from state
    const performanceID: number = 21813;
    dispatch(fetchTickets({ performanceID }));
  }, [dispatch]);

  // display loading message while request is made, could be an overlay
  if (ticketsLoading) {
    return (
      <StyledTickets>
        <div>Loading...</div>
      </StyledTickets>);
  }

  // display error message if request fails, could be an overlay
  if (ticketsError) {
    return (
      <StyledTickets>
        <div>Error: {ticketsError}</div>
      </StyledTickets>);
  }

  return (
    <StyledTickets>
      {ticketsList.length > 0 && ticketsList[0].map((ticket: any, i: number) => {
        const { priceBand: { description, name, variants } } = ticket;

        return variants.map((variant: any) => {
          const { id } = variant;
          return (
              <TicketRow key={`variant-${id}`} ticketName={name} ticketDescription={description} ticketInfo={variant} />
          );
        });
      })}
    </StyledTickets>
  );
}

export default Tickets;

const StyledTickets = styled.div`
  .ticket {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1px #ccc;
  }
  
  .button-round {
    width: 50px;
    height: 50px;
    background: #171f5c;
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
  }
`;
