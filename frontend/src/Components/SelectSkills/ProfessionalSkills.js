import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import { setSkills } from "../../store/asyncMethods/AuthMethods";
import { SET_SKILLS, UNSET_SKILLS } from "../../store/types/AuthTypes"
import { useSelector, useDispatch } from "react-redux"
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { SKILLS } from '../../skills'
import { getPostData } from '../../store/asyncMethods/PostMethods';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: "290vh",
  backgroundColor: "black",
  border: '2px solid #000',
  boxShadow: 24,
  padding: 6,
};
const ProfessionalSkills = (props) => {
  const { unprofessionalSkills } = props.history.location.state;
  const test = [];
  unprofessionalSkills.map(skill => {
    test.push(skill.id);
  })
  const history = useHistory();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { user, loading } = useSelector(state => state.AuthReducer);
  const [unselectedSkills, setUnselectedSkills] = useState(SKILLS);
  const dispatch = useDispatch();
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));


  const handleSelectSkill = (id, name) => {
    if (selectedSkills.length < 5) {
      const selectedSkill = unselectedSkills.find((skill) => skill.id === id);
      setSelectedSkills((prevState) => {
        return [...prevState, selectedSkill];
      });
      setUnselectedSkills((prevState) => {
        return prevState.map((skill) => {
          if (skill.id === id) {
            return { ...skill, selected: true };
          }
          return skill;
        });
      });
    }
  };

  const handleUnselectSkill = (id, name) => {
    setUnselectedSkills((prevState) => {
      return prevState.map((skill) => {
        if (skill.id === id) {
          return { ...skill, selected: false };
        }
        return skill;
      });
    });
    setSelectedSkills((prevState) => {
      return prevState.filter((skill) => skill.id !== id);
    });
  };
  const unselectedSkillsButtons = unselectedSkills.map((skill) => {
    if (!test.includes(skill.id)) {
      return (
        <>
          <ImageButton
            focusRipple
            key={skill.name}
            onClick={handleSelectSkill.bind(null, skill.id, skill.name)}
            style={{
              width: '20%'
            }}
            disabled={skill.selected}
          >
            <ImageSrc style={{ backgroundImage: `url("${skill.path}")`, backgroundSize: "cover" }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {skill.name}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </>
      );
    }
  });

  const selectedSkillsButtons = selectedSkills.map((skill) => {
    return (
      <Button
        key={skill.id}
        onClick={handleUnselectSkill.bind(null, skill.id, skill.name)}
        sx={{ m: 1 }}
        variant="contained"
      >
        {skill.name}
      </Button>
    );
  });
  const handleSubmit = () => {
    dispatch(setSkills(unprofessionalSkills, selectedSkills, user._id));
    dispatch(getPostData());
    loading ? history.push("/loading") : history.push("profile");
  }
  return (
    <Box
      sx={{
        background:
          'linear-gradient( 90deg, #424242 32.2%, rgba(255, 255, 255, 0.74) 100% )',
        width: '100%',
        height: '325vh',
        position: 'absolute',
        color: 'white',
        top: '0',
        left: '0',
        paddingTop: '30px',
      }}
    >
      <Box sx={style}>
        <Typography component="h1" variant="h4">
          What are your Skills?
        </Typography>
        <Typography component="h2" variant="subtitle1" sx={{ mb: 2 }}>
          Hobbies, sports, etc.
        </Typography>
        <Typography component="h2" variant="subtitle1" sx={{ mb: 2 }}>
          *Choose Only 5 Skills*
        </Typography>
        <Box
          sx={{
            border: '1px solid lightgray',
            borderRadius: '5px',
            py: 0.5,
            pl: 1,
            marginBottom: '8px',
          }}
        >
          <Typography component="h3" variant="subtitle2">
            Selected skills:
          </Typography>
          {selectedSkillsButtons}
        </Box>
        <Box>{unselectedSkillsButtons}</Box>
        <Button onClick={handleSubmit} sx={{ backgroundColor: "white", marginTop: "15px", float: "right", width: "80px", height: "40px" }} >next</Button>
      </Box>
    </Box>
  )
}
export default ProfessionalSkills;