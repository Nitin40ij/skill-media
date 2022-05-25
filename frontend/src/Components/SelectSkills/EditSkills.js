import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { editSkills } from "../../store/asyncMethods/AuthMethods";
import { UNSET_MESSAGE } from '../../store/types/AuthTypes';
import { SKILLS_NAME,SKILLS } from '../../skills';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const EditSkills = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {user,message} = useSelector(state=>state.AuthReducer);
    const [unactiveSkills,setUnactiveSkills] =useState([]);
    const [activeSkills,setActiveSkills] =useState([]);
    const handleunselectClick = (skill)=>{
        setUnactiveSkills([...unactiveSkills,skill]);
        setActiveSkills(activeSkills.filter(item => item.name!==skill.name));
    }
    const handleselectClick=(skill)=>{
        if(activeSkills.length<5){ 
        setActiveSkills([...activeSkills,skill]);
        setUnactiveSkills(unactiveSkills.filter(item => item.name!== skill.name));
    }
}
    const handleSubmit=e=>{
        let data=[];
        activeSkills.map(skill=>{
            data.push(skill.name);
        })
        dispatch(editSkills(data,user._id,'professional'));
    }
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

        const unselectedSkillsButtons = unactiveSkills.map((skill) => {
        return (
            <>
            <ImageButton
          focusRipple
          key={skill.name}
        //   onClick={handleSelectSkill.bind(null, skill.id,skill.name)}
          onClick={handleselectClick.bind(null,skill)}
          style={{
            width: '20%'
          }}
          disabled={skill.selected}
        >
          <ImageSrc style={{ backgroundImage: `url("${skill.path}")`, backgroundSize:"cover" }} />
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
    });
    useEffect(()=>{
            let arr=[];
            let arr1=[];
            SKILLS.forEach(skill=>{
              if(user.professionalSkills.includes(skill.name)){
                    arr1.push(skill);
              }else{
                if(!user.unprofessionalSkills.includes(skill.name)){
                  arr.push(skill);
                }
              }
            })
        setUnactiveSkills(arr);
        setActiveSkills(arr1);
    },[]);
    useEffect(()=>{
        if(message){
            history.push("home");
            dispatch({type:UNSET_MESSAGE});
        }
    },[message]);
  return (
    <>
        <div className="container" style={{marginTop:"100px"}} >
            {
                activeSkills.map(skill=>{
                    if(!(skill in activeSkills)){
                  return  <button  className='active btn'
                     onClick={handleunselectClick.bind(this,skill)}
                      style={{color:"#fff",
                      background:"blue",
                      marginLeft:"15px",
                      marginBottom:"10px",
                      marginTop:"15px"}} >
                          {skill.name}
                    </button>
                       }})
            }
        </div>
        <div className="container" style={{marginTop:"50px"}} >
                {unselectedSkillsButtons}
        </div>
        <button 
        className='btn btn-default' 
        onClick={handleSubmit} >
            Submit
        </button>
    </>
  )
}
export default EditSkills;