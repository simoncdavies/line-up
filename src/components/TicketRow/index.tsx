import React, { useState } from 'react';
import Button from '../ButtonRound';
import { formatPrice } from '../../utils/utils';

type TicketRowType = {
  ticketName: string;
  ticketDescription: string;
  ticketInfo: any;
};

const TicketRow = ({ ticketName, ticketDescription, ticketInfo }: TicketRowType) => {
  const [ticketNumber, setTicketNumber] = useState(0);

  // add a ticket when pressed
  // maybe some limit should be applied based on maximum tickets able to purchase in one time
  // or the number of tickets left to buy
  const onPlusClick = (ticketInfo: number) => {
    // ticket number, id should be stored in global state for use later at basked stage
    setTicketNumber(ticketNumber + 1);
  }

  // remove ticket when pressed
  // button is disabled when no tickets are added
  const onMinusClick = (ticketInfo: number) => {
    // ticket number, id should be stored in global state for use later at basked stage
    setTicketNumber(ticketNumber - 1);
  }

  const { id, adjusters, description: variantDescription, name: variantName, price: { value } } = ticketInfo;
  const { name: bookingName, price: { value: fee } } = adjusters[0];

  return (
    <div className="ticket" key={`ticket-${id}`}>
      <p key={`title-${id}`}>{`${ticketName} - ${variantName}`}</p>
      <p key={`desc-${id}`}>{ticketDescription}</p>
      <p key={`variant-desc-${id}`}>{variantDescription}</p>
      <p key={`price-${id}`}>{formatPrice(value)}</p>
      <p key={`fee-${id}`}>{`(+ ${formatPrice(fee)} ${bookingName})`}</p>
      <div>
        <Button type="minus" onPress={() => onMinusClick(ticketInfo)} isDisabled={ticketNumber === 0} />
        {ticketNumber}
        <Button type="plus" onPress={() => onPlusClick(ticketInfo)} />
      </div>
    </div>
  );
}

export default TicketRow;
