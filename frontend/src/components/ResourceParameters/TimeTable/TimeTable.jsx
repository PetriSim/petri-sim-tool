
import React from 'react'

import { Box, Heading, Text, Grid, Card, CardBody } from "@chakra-ui/react";

function TimeTable({data}) {
    // Create an array of days of the week and an array of hours in a day
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => i);



  return (
    <Card bg="white" w="100%" overflowX="auto">
    <CardBody>
    <Grid templateColumns="repeat(8, 1fr)" gap={2}>

      <Box>
        <Heading size="sm" textAlign="center">Time</Heading>
      </Box>
      {/* Map over the array of days to render a Box for each day containing a Heading to display the day */}
      
      {days.map((day) => (
        <Box key={day}>
          <Heading size="sm" textAlign="center">{day}</Heading>
        </Box>
      ))}

      {/* Map over the array of hours to render a Box for each hour, and for each hour, map over the array of days to highlight time slots if there are events during that time. */}
      {hours.map((hour) => {

        return (
          <React.Fragment key={hour}>
            <Box>
              <Text textAlign="center">{hour + ":00"}</Text>
            </Box>
            {days.map((day, i) => {
              // Initialize a variable to keep track of whether the current time slot is highlighted or not
              let isHighlighted = false;
                // Loop through the "data" prop to check if there are events during the current time slot on the current day
              data.forEach(({ startWeekday, startTime, endWeekday, endTime }) => {
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
                <Box key={i} bg={isHighlighted ? "green.200" : "blackAlpha.100"} borderRadius="4"></Box>
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