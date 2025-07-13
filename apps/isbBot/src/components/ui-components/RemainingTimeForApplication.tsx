import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { AiFillThunderbolt } from "react-icons/ai";
import { Box } from '@chakra-ui/react';
dayjs.extend(duration);

// const textStyles = {
//   fontFamily: 'Roboto-regular',
//   fontSize: '11px',
//   fontWeight: 400,
//   lineHeight: '14px',
//   color: '#2A41AB',
//   marginTop: '3px',
//   textAlign: "center",
// }

const alignStyle = {
  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
}


const RemainingTimeForApplication = () => {
  const [remainingTime, setRemainingTime] = useState<any>({
    day: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const dayArr = remainingTime.day;
  const hourArr = remainingTime.hours;
  const minuteArr = remainingTime.minutes;
  const secondArr = remainingTime.seconds;

  useEffect(() => {
    const targetDate = dayjs('2025-06-30T24:00:00');

    const updateRemainingTime = () => {
      const now = dayjs();
      const diff = targetDate.diff(now);

      if (diff > 0) {
        const timeDuration = dayjs.duration(diff);
        const months = timeDuration.months();
        let totalDays = timeDuration.days();

        // If there are remaining months, calculate the days in those months and add them
        if (months > 0) {
          for (let i = 0; i < months; i++) {
            const monthDays = now.add(i, 'month').daysInMonth();
            totalDays += monthDays;
          }
        }

        const days = totalDays.toString().padStart(2, '0');
        const hours = timeDuration.hours().toString().padStart(2, '0');
        const minutes = timeDuration.minutes().toString().padStart(2, '0');
        const seconds = timeDuration.seconds().toString().padStart(2, '0');

        setRemainingTime({
          day: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
      } else {
        setRemainingTime('The target date has passed.');
      }
    };

    // Update the remaining time every second
    const intervalId = setInterval(updateRemainingTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const targetDate = dayjs('2024-12-21T24:00:00');

  //   const updateRemainingTime = () => {
  //     const now = dayjs();
  //     const diff = targetDate.diff(now);

  //     if (diff > 0) {
  //       const timeDuration = dayjs.duration(diff);
  //       const days = timeDuration.days();
  //       const daysText = days === 1 ? '1 day' : `${days} days`;
  //       const hours = timeDuration.hours().toString().padStart(2, '0');
  //       const minutes = timeDuration.minutes().toString().padStart(2, '0');
  //       const seconds = timeDuration.seconds().toString().padStart(2, '0');

  //       setRemainingTime({
  //         day: days.toString().padStart(2, '0'),
  //         hours: hours,
  //         minutes: hours,
  //         seconds: seconds
  //       })

  //     } else {
  //       setRemainingTime('The target date has passed.');
  //     }
  //   };

  //   // Update the remaining time every second
  //   const intervalId = setInterval(updateRemainingTime, 1000);

  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <Box>
        <Box
          fontSize={'14px'}
          color={'#242424'}
          lineHeight={'17px'}
          fontWeight={600}

        >Application ends in</Box>
        <Box
          display={'flex'}
          borderRadius={'8px'}
          border='1px solid #D3D3D3'
          overflow={'hidden'}
          mt='8px'
        >
          <Box
            backgroundColor={'#FF0000'}
            p={{ base: '5px 4px', lg: '8px 13px' }}
            color={'#FFFFFF'}
            fontSize={{ base: '12px', lg: '14px' }}
          >June 30th</Box>
          <Box
            p={{ base: '5px 4px', lg: '8px 19px' }}
            fontSize={{ base: '12px', lg: '14px' }}
          >2025</Box>
        </Box>
      </Box>
      <div
        style={{
          color: "#333F51", borderRadius: "10px", fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 400,
        }}
      >
        <div style={{ display: "flex", gap: "8px", marginTop: "12px", justifyContent: "center", color: '#2A41AB' }}>
          <div style={alignStyle}>
            <Box
              border='1.25px solid #2A41AB'
              p={{ base: "3px 4px", lg: '7px 9px' }}
              borderRadius={'5px'}
              fontSize={{ base: '12px', lg: '14px' }}
              color='#2A41AB'
            >{dayArr ?? '--'}</Box>
            <Box fontFamily={'Roboto-regular'}
              fontSize={{ base: '7px', lg: '11px' }}
              lineHeight={{ base: "8px", lg: '14px' }}
              color='#2A41AB'
              marginTop='4px'
              textAlign="center">DAYS</Box>
          </div> :
          <div style={alignStyle}>
            <Box
              border='1.25px solid #2A41AB'
              p={{ base: "3px 4px", lg: '7px 9px' }}
              borderRadius={'5px'}
              fontSize={{ base: '12px', lg: '14px' }}
              color='#2A41AB'
            >{hourArr ?? '--'}</Box>
            <Box fontFamily={'Roboto-regular'}
              fontSize={{ base: '7px', lg: '11px' }}
              lineHeight={{ base: "8px", lg: '14px' }}
              color='#2A41AB'
              marginTop='4px'
              textAlign="center">HOURS</Box>
          </div> :
          <div style={alignStyle}>
            <Box
              border='1.25px solid #2A41AB'
              p={{ base: "3px 4px", lg: '7px 9px' }}
              borderRadius={'5px'}
              fontSize={{ base: '12px', lg: '14px' }}
              color='#2A41AB'
            >{minuteArr ?? '--'}</Box>
            <Box fontFamily={'Roboto-regular'}
              fontSize={{ base: '7px', lg: '11px' }}
              lineHeight={{ base: "8px", lg: '14px' }}
              color='#2A41AB'
              marginTop='4px'
              textAlign="center">MINUTES</Box>
          </div> :
          <div style={alignStyle}>
            <Box
              border='1.25px solid #2A41AB'
              p={{ base: "3px 4px", lg: '7px 9px' }}
              borderRadius={'5px'}
              fontSize={{ base: '12px', lg: '14px' }}
              color='#2A41AB'
            >{secondArr ?? '--'}</Box>
            <Box fontFamily={'Roboto-regular'}
              fontSize={{ base: '7px', lg: '11px' }}
              lineHeight={{ base: "8px", lg: '14px' }}
              color='#2A41AB'
              marginTop='4px'
              textAlign="center">SECONDS</Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemainingTimeForApplication;
