
import React from 'react'

import { Box, Heading, Text, Grid, Card, CardBody } from "@chakra-ui/react";

function TimeTable(props) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => i);



  return (
    <Card bg="white" w="100%">
    <CardBody>
    <Grid templateColumns="repeat(8, 1fr)" gap={2}>

      <Box>
        <Heading size="sm" textAlign="center">Time</Heading>
      </Box>
      {days.map((day) => (
        <Box key={day}>
          <Heading size="sm" textAlign="center">{day}</Heading>
        </Box>
      ))}


      {hours.map((hour) => {

        return (
          <React.Fragment key={hour}>
            <Box>
              <Text textAlign="center">{hour + ":00"}</Text>
            </Box>
            {days.map((day, i) => {
              let isHighlighted = false;
              props.data.map(({ startWeekday, startTime, endWeekday, endTime }) => {
                const startDayIndex = days.indexOf(startWeekday);
                const endDayIndex = days.indexOf(endWeekday);
                const currentDayIndex = days.indexOf(day);
                 startTime = Number(startTime);
                 endTime = Number(endTime);
                if((currentDayIndex >= startDayIndex) && (currentDayIndex <= endDayIndex) && 
                (hour >= startTime) && (hour < endTime)){
                  isHighlighted = true;
              }
              });
              return (
                <Box key={i} bg={isHighlighted ? "green.200" : "blackAlpha.100"} borderRadius="4">
            
                </Box>
              );
            })}
          </React.Fragment>
        );
      })}
    </Grid>
    </CardBody>
    </Card>
  );
}

export default TimeTable;