
const ExerciseGroup5 = [
  {
    image: './GravityGains/backEnd/seed/Images/exerciseImages/MuscleUp.png',
    name: 'Muscle Up',
    lvl: 'Advanced',
    video: 'https://youtu.be/YxBf7Vgh4Lc?si=LgTiUjNSVSZgH2Bf',
    techniqueSummary: `
      1. Pull behind bar
      2. Keep elbows in
      3. Rotate your wrists over the bar
    `,
    description: `
      **Description:**
      The Muscle-Up is an advanced calisthenic exercise that combines elements of pulling and pushing, requiring strength, explosiveness, and coordination. It targets almost all muscles in the upper body and is known for its three distinct phases: Pull, Transition, and Push.
  
      **Execution:**
      1. **Pull:** Pull your body as high as possible, aiming to bring your chest or even hips to the level of the bar.
      2. **Transition:** This is the challenging phase where you need to rotate your wrists over the bar and throw your shoulders over it.
      3. **Push:** Complete the movement with a bar Dip, pushing yourself up to a fully extended position.
  
      **Muscle Engagement:**
      The Muscle-Up engages multiple muscle groups in the upper body, requiring a combination of strength and coordination. It is an explosive movement that demands a seamless transition between pulling and pushing.
  
      **Variations:**
      - The Muscle-Up can be performed on gymnastic rings, often using a false grip (start dead hang with wrists over rings).
      - Experiment with different hand placements and grips to target specific muscle groups.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id, bodyCategoriesChest._id]
  },  
  {
    image: './GravityGains/backEnd/seed/Images/exerciseImages/KippingMuscleUp.png',
    name: 'Kipping Muscle Up',
    lvl: 'Advanced',
    video: 'https://youtu.be/PMEhv0-WC34?si=6fC4_nb8dDKLefl7',
    techniqueSummary: `
      1. Swing forward
      2. Use momentum
      3. Rotate wrists
      4. Shoulders over the bar
      5. Elbows pullback
    `,
    description: `
      **Description:**
      The Kipping Muscle Up is an advanced calisthenic exercise that leverages controlled swinging and momentum to perform a dynamic transition over the bar. This technique-intensive movement engages various muscle groups and demands precise coordination for a fluid execution.
  
      **Execution:**
      1. Initiate the movement by swinging forward to build up momentum.
      2. As you swing back, use the accumulated momentum as extra assistance to pull yourself as high as possible.
      3. Shortly before reaching the highest point, pull yourself towards the bar, focusing on pulling your elbows backward.
      4. Actively rotate your wrists during the pull and throw your shoulders over the bar.
      5. Once your chest is over the bar, execute a dip to extend your arms fully.
      6. For the second repetition, use the momentum generated from the descent, similar to the initial swing forward.
  
      **Tips:**
      - Master the timing of the swing and pull for efficient use of momentum.
      - Practice controlled wrist rotation during the entire movement.
      - Focus on maintaining a smooth and controlled descent to set up for subsequent repetitions.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id, bodyCategoriesChest._id]
  },
  {
    image: './UNIT5/week1/mon/GravityGains/backEnd/seed/Images/exerciseImages/PullUp.png',
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
];

const G5exerciseIds = [];
  
for (const ExerciseGroup5Data of ExerciseGroup5) {
  const newExercise = await findOrCreateExercise(ExerciseGroup5Data);
  G5exerciseIds.push(newExercise._id);
}

const MuscleUp = await Workout.create({
  // userId: Admin._id,
  exerciseID: G5exerciseIds,
  name: 'Muscle Up',
  image: './UNIT5/week1/mon/GravityGains/backEnd/seed/Images/workoutImages/MuscleUp.png',
  lvl: 'Advanced'
});
console.log(`Workout "${MuscleUp.name}" created with exercises:`, G5exerciseIds);