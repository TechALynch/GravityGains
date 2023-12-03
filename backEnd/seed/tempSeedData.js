const ExerciseGorup3 = [
  {
    image: './UNIT5/week1/mon/GravityGains/backEnd/seed/Images/exerciseImages/HighPullUp.png',
    name: 'High Pull Up',
    lvl: 'Advanced',
    video: 'https://www.youtube.com/watch?v=vk3OuWhoS5Y',
    techniqueSummary: `
      1. Elbows move behind back
      2. Hollow Body
      3. Pull behind bar instead under bar
      4. Tighten glutes and core
      5. Small swing prior pull
    `,
    description: `
      **Description:**
      The High Pull Up is an advanced calisthenic exercise designed to target the muscles of the upper back and arms with an emphasis on achieving a higher pull. This variation adds complexity and intensity to the traditional Pull-Up, challenging your strength and control.
  
      **Execution:**
      1. Start from a dead hang position with a slightly wider than shoulder-width grip.
      2. Initiate the pull by moving your elbows behind your back, engaging the upper back muscles.
      3. Maintain a hollow body position throughout the movement by tightening your glutes and core.
      4. Instead of pulling directly under the bar, aim to pull your chest or upper body behind the bar.
      5. Add a small swing prior to the pull, introducing an element of dynamic control to the exercise.
  
      **Variations:**
      As an advanced variation, mastering basic Pull-Up mechanics is crucial before attempting the High Pull Up. Focus on performing each repetition with precision and control, ensuring a full range of motion for optimal results.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id]
  },
  {
    image: './UNIT5/week1/mon/GravityGains/backEnd/seed/Images/exerciseImages/PullUp3x7.png',
    name: 'Pull-Up',
    lvl: 'Beginner',
    video: 'https://www.youtube.com/watch?v=GBqAZP6jquc',
    techniqueSummary: `
      1. Scapula depressed and retracted
      2. No swing
      3. Full range of motion (ROM)
    `,
    description: `
      **Description:**
      The Pull-Up is a fundamental calisthenic exercise that serves as a prerequisite for mastering more advanced bar skills. The primary progression goal is to establish basic upper body strength, laying the foundation for achieving a Muscle Up.
  
      **Execution:**
      1. Begin in a dead hang position.
      2. Initiate the movement by depressing and retracting the scapula.
      3. Engage your biceps and back muscles to pull yourself up, aiming for your chin to surpass the bar or ideally, your chest to touch the bar.
      4. Descend slowly and with control back to the dead hang position.
      5. It's crucial to perform the full range of motion for maximum effectiveness.
  
      **Variations:**
      The Chin-Up, done with an underhand grip, differs from the overhand grip of the Pull-Up. The underhand grip causes your elbows to naturally bend more inward, targeting the biceps to a greater extent. The Pull-Up can also be performed on rings instead of bars.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id]
  },
  {
    image: './GravityGains/backEnd/seed/Images/exerciseImages/StraightBarDip.png',
    name: 'Straight Bar Dip',
    lvl: 'Beginner',
    video: 'https://youtu.be/70y7r0vBddM?si=25ThDoaerUJ7jhwr',
    techniqueSummary: `
      1. Lower to about 90°
      2. Keep scapula retracted on the way down
      3. Keep elbows in
    `,
    description: `
      **Description:**
      The Straight Bar Dip is a beginner-level exercise that targets the muscles of the upper body, particularly the chest and triceps. It is an effective bodyweight movement for building strength and endurance in the arms and shoulders.
  
      **Execution:**
      Start in the support position on a straight bar. Slowly lower yourself until your arms are at least in a 90° angle. On the way down, keep your scapula retracted, your elbows in, and your core tight. Push yourself up to the starting position.
  
      **Learn more:**
      [Watch the video tutorial](https://youtu.be/70y7r0vBddM?si=25ThDoaerUJ7jhwr)
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesChest._id]
  },
  {
    image: './GravityGains/backEnd/seed/Images/exerciseImages/PushUp.png',
    name: 'Push-Up',
    lvl: 'Beginner',
    video: 'https://www.youtube.com/watch?si=cxGleEi-vT7aYg-s&v=IODxDxX7oi4&feature=youtu.be',
    techniqueSummary: `
      1. Start in a plank position with hands placed slightly wider than shoulder-width.
      2. Keep a straight line from head to heels.
      3. Lower your chest towards the ground by bending your elbows.
    `,
    description: `
      **Description:**
      The Push-Up is a classic bodyweight exercise that targets the chest, shoulders, triceps, and core muscles. It is versatile and can be adapted for all fitness levels.
  
      **Execution:**
      1. Start in a plank position with hands placed slightly wider than shoulder-width.
      2. Keep a straight line from head to heels.
      3. Lower your chest towards the ground by bending your elbows.
      4. Ensure a full range of motion by bringing your chest close to the ground.
      5. Push through your palms to return to the starting position.
  
      **Variations:**
      Modify intensity by performing incline or decline push-ups. You can also experiment with hand placement for different muscle emphasis.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesChest._id]
  }
];

const G3exerciseIds = [];
  
for (const ExerciseGorup3Data of ExerciseGorup3) {
  const newExerciseGorup3 = await Exercise.create(ExerciseGorup3Data);
  G3exerciseIds.push(newExerciseGorup3._id);
}

const highPushPullWorkout = await Workout.create({
  // userId: User1._id,
  exerciseID: G3exerciseIds,
  name: 'High Pull Push',
  image: './UNIT5/week1/mon/GravityGains/backEnd/seed/Images/workoutImages/HighPushPull.png',
  lvl: 'Beginner'
});
console.log(`Workout "${highPushPullWorkout.name}" created with exercises:`, G3exerciseIds);
