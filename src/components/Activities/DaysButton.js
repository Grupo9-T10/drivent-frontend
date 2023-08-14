import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
export default function DaysButton({ event, token, setActivities }) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const LocalizedFormat = require('dayjs/plugin/localizedFormat');
  dayjs.extend(LocalizedFormat);
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);
  useEffect(() => {
    getDays();
  }, []);

  function formatDate(date) {
    const day = dayjs(date).locale('pt-br').format('dddd, DD/MM').replace('-feira', '');
    return day[0].toUpperCase() + day.substring(1);
  }

  function getDurationEvent() {
    const { startsAt, endsAt } = event;
    const startDate = dayjs(startsAt);
    const endDate = dayjs(endsAt);
    const diff = endDate.diff(startDate, 'day');
    return diff;
  }

  function getDays() {
    const diff = getDurationEvent();
    const { startsAt } = event;

    const allDays = [];
    for (let i = 0; i < diff; i++) {
      const day = dayjs(startsAt);
      const newDay = day.add(i, 'day');
      allDays.push(newDay.$d.toString());
    }
    setDays(allDays);
  }

  function getDayActivities(day) {
    setSelectedDay(day);
    const date = dayjs(day).format('YYYY-MM-DD');
    api
      .get(`/activities/day?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setActivities(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <DaysList>
      <ScrollDays>
        {days.map((d) => (
          <ButtonDay key={d} onClick={() => getDayActivities(d)} isSelected={selectedDay === d}>
            {formatDate(d)}
          </ButtonDay>
        ))}
      </ScrollDays>
    </DaysList>
  );
}
const DaysList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 65px;
  justify-content: space-between;
  padding-left: 25px;
`;

const ButtonDay = styled.button`
  margin: 7px;
  font-family: 'Roboto', sans-serif;
  width: 150px;
  height: 38px;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 10px -2px #6e6e6e;
  :hover {
    cursor: pointer;
  }
  background-color: ${(props) => (props.isSelected ? '#FCD37C' : '#e0e0e0')};
`;

const ScrollDays = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #abaaac;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;
