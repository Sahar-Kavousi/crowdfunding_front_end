import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export default function ResponsiveDialog({isOpen, handleClose, title, content, actions}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*<Button autoFocus onClick={handleClose}>*/}
                    {/*    Disagree*/}
                    {/*</Button>*/}
                    {/*<Button onClick={handleClose} autoFocus>*/}
                    {/*    Agree*/}
                    {/*</Button>*/}
                    {actions.map((action, index) => (
                        <Button key={index} onClick={action.onClick}>
                            {action.label}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
