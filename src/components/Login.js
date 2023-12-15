import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';
import { useNavigate  } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '50%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const LoginForm = (setIsAuthenticated) => {
    const classes = useStyles();
    const [auth,setAuth] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
 const history = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.email && formData.password){
             localStorage.setItem('email', formData.email);
            history('/private/list');
        }
        // Reset form after submission
        // setFormData({
        //     email: '',
        //     password: '',
        // });
    };

    return (
        <div>
            <h2 style={{textAlign:'center'}}>Login Form</h2>
            <div className={classes.container}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
