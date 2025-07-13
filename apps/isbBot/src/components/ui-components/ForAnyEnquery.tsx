import { Box } from '@chakra-ui/react'
import React from 'react'
import enqueryIcon from '../../assets/svg/enqueryIcon.svg'
import Image from 'next/image'
const ForAnyEnquery = ({textColor='#0F0F0F',emailColor='#575757'}) => {
    return (
        <Box
            display={'flex'}
            gap='14px'
            mt='15px'
        >
            <Image src={enqueryIcon} alt='icon' />
            <Box>
                <Box
                    color={ textColor}
                    fontSize={'14px'}
                    fontWeight={600}
                >For any queries, reach out to us at</Box>
                <Box
                    fontSize={'16px'}
                    fontWeight={500}
                    color={ emailColor }
                >
                    <a href="mailto:ivi@isb.edu">ivi@isb.edu</a>
                </Box>
            </Box>
        </Box>
    )
}

export default ForAnyEnquery