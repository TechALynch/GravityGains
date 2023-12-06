import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import SkillsIndexPageHOME from './SkillsIndexPageHOME'
import SkillPage from './skillPage'
import WorkoutIndexPage from './WorkoutIndexPage'
import WorkoutPage from './WorkoutPage'
import ExerciseIndexPage from './ExerciseIndexPage'
import ExercisePage from './ExercisePage'
import MuscleCategoryPage from './MuscleCategoryPage'
import CreatePage from './CreatePage'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'
import EquipmentGuide from './EquipmentGuide'
import UserSettings from './UserSettings'
import AboutDonate from './AboutDonate'
// import Header from './components/Header'

export default function Main (){
    return (
        
        <div className="Main">
            {/* <Header /> */}
            <Routes> 
                <Route exact path ="/" element ={<Login/>} />
                <Route exact path ="/SignUp" element ={<SignUp/>} />
                <Route exact path ="/SkillsIndexPageHOME" element ={<SkillsIndexPageHOME/>} />
                <Route exact path ="/SkillPage/:id" element ={<SkillPage/>} />
                <Route exact path ="/WorkoutIndexPage" element ={<WorkoutIndexPage/>} />
                <Route exact path ="/WorkoutPage" element ={<WorkoutPage/>} />
                <Route exact path ="/ExerciseIndexPage" element ={<ExerciseIndexPage/>} />
                <Route exact path ="/ExercisePage/:id" element ={<ExercisePage/>} />
                <Route path="/exercise/:id" element={<ExercisePage />} />
                <Route path="/category/:id" element={<MuscleCategoryPage />} />
                <Route exact path ="/CreatePage" element ={<CreatePage/>} />
                <Route exact path ="/CreateWorkout" element ={<CreateWorkout/>} />
                <Route exact path ="/CreateExercise" element ={<CreateExercise/>} />
                <Route exact path ="/EquipmentGuide" element ={<EquipmentGuide/>} />
                <Route exact path ="/UserSettings" element ={<UserSettings/>} />
                <Route exact path ="/AboutDonate" element ={<AboutDonate/>} />
            </Routes>
        </div>
)
}