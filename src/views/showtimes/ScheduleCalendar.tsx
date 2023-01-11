import { useState } from 'react'

import FullCalendar from "@fullcalendar/react";
import { EventApi } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box
} from "@mui/material";

import useFetch from 'src/@core/utils/use-fetch'
import { Screening } from "src/@core/layouts/types";
import {
  ScreeningDeleteEndpoint
} from 'src/configs/appConfig'
import { EventImpl } from '@fullcalendar/core/internal';

import CalendarAddEvent from './CalendarAddEvent';


const ScheduleCalendar = ({ showtimesData, updatedShowtimesInfo }: { showtimesData: Screening[]; updatedShowtimesInfo: any }) => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [dialogAddEvent, setDialogAddEvent] = useState<boolean>(false)
  const [newEvent, setNewEvent] = useState();
  const { fetchData, response, error, loading } = useFetch()

  const initialData = () => {
    const newShowtime = showtimesData.map(showtime => (
      { id: showtime.id,
        title: showtime.movie.title,
        start: (new Date(showtime.date)).getTime(), 
        end: (new Date(showtime.date)).getTime() + (showtime.movie.duration || 0) * 60000,
      }));

    return newShowtime
  }

  const deleteShowtimesInfo = (event: EventImpl) => {
    const path = ScreeningDeleteEndpoint.path.replace(':id', event.id.toString())
    const method = ScreeningDeleteEndpoint.method
    fetchData(method, path, undefined, undefined).then(res => {
      if (res && res.success) {
        updatedShowtimesInfo()
      }
    })
  }

  function handleDateClick(selected: any) {
    setNewEvent(selected)
    setDialogAddEvent(true)
  }

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
    deleteShowtimesInfo(selected.event)
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={initialData()}
          />
        </Box>
      </Box>
      {dialogAddEvent ? (
        <CalendarAddEvent
        newEvent={newEvent}
        closeDialogAddEvent={() => setDialogAddEvent(false)}
        updatedShowtimesInfo={updatedShowtimesInfo}
        ></CalendarAddEvent>
      ) : null}
    </Box>
  );
};

export default ScheduleCalendar;