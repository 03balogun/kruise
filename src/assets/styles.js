/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/2/19
 * Time: 6:50 AM
 */

export default {
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#FFF',
        },
    },
    typography: {
        useNextVariants: true
    },
    appStyles: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        paper: {
            padding: 20
        },
        imageWrapper: {
            textAlign: "center",
        },
        appIcon: {
            margin: '20px auto 20px auto',
            height: '50px',
            width: '50px',
        },
        pageTile: {
            margin: '10px auto 10px auto',
            textAlign: "center",
        },
        progressIcon: {
            position: 'absolute'
        },
        signUpText: {
            marginTop: 10
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
    }
};


