import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from "@mui/material/Typography";

DisplayPledges.propTypes = {
    pledges: PropTypes.arrayOf(
        PropTypes.shape({

            id: PropTypes.number,
            supporter: PropTypes.number,
            supporter_username: PropTypes.string,
            supporter_firstname: PropTypes.string,
            supporter_lastname: PropTypes.string,
            amount: PropTypes.number,
            comment: PropTypes.string,
            anonymous: PropTypes.bool,
            project: PropTypes.number,
        })
    )
};

function DisplayPledges({pledges}) {
    return (
        <>
            <Typography variant="h6" component="h6">
                People who made a donation
            </Typography>
            {pledges.map((pledge, key) => (
                <Box flexDirection='column' key={key} textAlign="start" sx={{ flexGrow: 1, gap: 2, m: 2 }}>
                    <Typography component={"label"} sx={{ fontSize: 18 }}>
                        {pledge.anonymous ? "Anonymous" :
                            `${pledge.supporter_firstname || ''} ${pledge.supporter_lastname || ''}`.trim() || pledge.supporter_username}
                        <br/>
                    </Typography>
                    <Typography>
                        Pledge Amount: <strong>${pledge.amount}</strong>
                    </Typography>
                </Box>
            ))}
        </>
    );
}

export default DisplayPledges;
