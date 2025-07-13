import React from 'react'
import instructionIcon1 from '../../assets/svg/instructionIcon1.svg'
import { Box, List, ListItem } from '@chakra-ui/react'
import Image from 'next/image'
const InstructionContainer = ({ data }: any) => {
    return (
        <Box>
            <Box fontSize={'16px'} fontWeight={600} display={'flex'}
                alignItems={'center'}
                gap={'12px'}
                background={'#E8EEFF'}
                p='6px 18px'
                borderRadius={'8px'}
                mt='15px'
                mb='12px'
            >
                <Image src={data.icon} alt='icon' /> {data.heading}
            </Box>
            <Box>
                {data?.list.map((item: any) => {
                    return <>
                        {item.subHeading && <Box
                            color={'#333F51'}
                            fontSize={'16px'}
                            fontWeight={600}
                            py='12px'
                        >
                            {item?.subHeading}
                        </Box>}
                        <Box pl={'15px'}>
                            <ul style={{ fontSize: "15px", lineHeight: '18px', color: "#333F51" }}>
                                {item.list.map((value: string, i: number) => {
                                    return <li key={i} style={{ paddingBottom: "12px " }} >{value}</li>
                                })}
                            </ul>
                        </Box>
                    </>
                })}
            </Box>
        </Box>
    )
}

export default InstructionContainer