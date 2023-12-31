const db = require('../db');
const { Category, Exercise, Skill, User, Workout} = require('../models/index');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('DB On');

//Function used to Create or skip exercise that are in each workout group array
const findOrCreateExercise = async (exerciseData) => {
  const existingExercise = await Exercise.findOne({ name: exerciseData.name });
  if (existingExercise) {
    console.log(`Exercise "${exerciseData.name}" already exists. Skipping creation.`);
    return existingExercise;
  } else {
    const newExercise = await Exercise.create(exerciseData);
    console.log(`Exercise "${exerciseData.name}" created.`);
    return newExercise;
  }
};

const main = async () => {
  ////Add new Users\\\\
  const Admin = await User.create({
    authenticationId: '',
    password: '12345678',
    userName: 'Admin',
    email: 'Anthony.Lynch001@example.com',
    fName: 'Anthony',
    lName: 'Lynch'
  });

  const User2 = await User.create({
    authenticationId: '',
    password: '12345678',
    userName: 'John.Doe',
    email: 'John.Doe@outlook.com',
    fName: 'John',
    lName: 'Doe'
  });
  
  ////Add new body Categories\\\\
  const bodyCategoriesLegs = await Category.create({
    category_id: 1,
    image: '/Images/categoryImages/legIcon.png',
    name: 'Legs',
    description: `
      The "Legs" refer to the lower extremities of the human body, including the thighs, knees, calves, ankles, and feet. The muscles in the legs are vital for various functions, such as walking, running, standing, and providing stability.
  
      Key muscle groups in the legs include:
  
      - **Quadriceps:** Located at the front of the thigh, the quadriceps are responsible for extending the knee. Exercises like squats and lunges target the quadriceps.
  
      - **Hamstrings:** Positioned at the back of the thigh, the hamstrings play a crucial role in bending the knee and extending the hip. Exercises like deadlifts and leg curls target the hamstrings.
  
      - **Calves:** The calf muscles, including the gastrocnemius and soleus, are located at the back of the lower leg and are involved in ankle flexion. Calf raises are effective for targeting these muscles.
  
      Strengthening the legs is essential for overall lower body strength, stability, and mobility. Leg exercises contribute to athletic performance, enhance functional movement, and support a well-balanced physique.
  
      Common exercises for the legs include squats, lunges, deadlifts, leg presses, and calf raises. Incorporating a variety of leg exercises into your fitness routine helps target different muscle groups and promotes comprehensive lower body development.
    `,
  });
  
  const bodyCategoriesCore = await Category.create({
    category_id: 2,
    image: '/Images/categoryImages/coreIcon.png',
    name: 'Core',
    description: `
      The "Core" refers to the central part of the body, encompassing various muscles in the torso. These muscles play a crucial role in providing stability, supporting posture, and facilitating movement.
  
      Key components of the core muscles include:
  
      - **Rectus Abdominis:** Positioned along the front of the abdomen, the rectus abdominis is often referred to as the "six-pack" muscle. It plays a primary role in flexing the spine and is activated during activities like crunches.
  
      - **Obliques:** The obliques are divided into two groups: internal and external. The internal obliques run diagonally on the sides of the abdomen, while the external obliques run perpendicular to them. These muscles are essential for twisting and side-bending movements.
  
      - **Transverse Abdominis:** This is the deepest layer of the abdominal muscles and provides crucial stability to the core. It acts like a natural corset, helping to compress the abdominal contents and support the spine.
  
      Strengthening the core is vital for overall functional fitness, balance, and injury prExerciseion. A strong core supports the spine, improves posture, and enhances performance in various physical activities.
  
      Common exercises for the core include crunches, planks, Russian twists, and leg raises. Incorporating these exercises into your fitness routine promotes core strength, stability, and contributes to a well-rounded and resilient physique.
    `,
  });
  
  const bodyCategoriesShoulders = await Category.create({
    category_id: 3,
    image: '/Images/categoryImages/shoulderIcon.png',
    name: 'Shoulders',
    description: `
      The "Shoulders" refer to the deltoid muscles that form the rounded contours of the upper arms and shoulders. Developing strong and well-defined shoulders not only contributes to an appealing physique but also enhances upper body strength and functionality.
  
      Key muscle groups in the shoulders include:
  
      - **Anterior Deltoid:** The front part of the shoulder that is involved in shoulder flexion. Exercises like front raises target the anterior deltoid.
  
      - **Medial Deltoid:** The middle part of the shoulder responsible for shoulder abduction. Lateral raises and lateral deltoid exercises target this area.
  
      - **Posterior Deltoid:** The rear part of the shoulder that is involved in shoulder extension. Exercises like reverse flys target the posterior deltoid.
  
      Strengthening the shoulders contributes to overall upper body stability, improves posture, and supports a well-rounded physique. Shoulder exercises are essential for athletes and individuals engaged in activities that require overhead movements.
  
      Common exercises for the shoulders include overhead press, lateral raises, front raises, and reverse flys. Incorporating a variety of shoulder exercises in your fitness routine helps target different areas of the deltoids and promotes balanced shoulder development.
    `,
  });  

  const bodyCategoriesChest = await Category.create({
    category_id: 4,
    image: '/Images/categoryImages/chestIcon.png',
    name: 'Chest',
    description: `
      The "Chest" refers to the pectoral muscles located in the front of the upper body. These muscles play a significant role in various upper body movements and contribute to overall upper body strength and aesthetics.
  
      Key components of the chest muscles include:
  
      - **Pectoralis Major:** The primary muscle of the chest, consisting of the clavicular and sternal portions. It is responsible for movements like pushing, such as during bench presses and chest fly exercises.
  
      - **Pectoralis Minor:** Located beneath the pectoralis major, this muscle assists in stabilizing the shoulder blades and is engaged during certain chest exercises.
  
      Strengthening the chest muscles is essential for enhancing upper body strength, improving posture, and achieving a well-balanced physique. Common exercises for the chest include bench presses, push-ups, chest flys, and dips.
  
      Whether you're aiming for increased strength or a sculpted chest appearance, incorporating chest exercises into your fitness routine is key. These exercises not only target the pectoral muscles but also engage surrounding muscles, contributing to overall upper body development.
  
      Remember to perform a variety of chest exercises to target different areas of the chest and promote balanced muscle growth.
    `,
  });
  
  const bodyCategoriesBack = await Category.create({
    category_id: 5,
    image: '/Images/categoryImages/backIcon.png',
    name: 'Back',
    description: `
      The "Back" refers to the posterior part of the upper body, encompassing various muscles that play a crucial role in supporting posture, facilitating movement, and contributing to overall strength.
  
      Key muscle groups in the back include:
  
      - **Latissimus Dorsi (Lats):** The broad muscles of the back that extend from the upper arm to the spine. Lats are responsible for movements like pulling and adduction of the arms. Exercises like pull-ups and rows target the lats.
  
      - **Trapezius:** The trapezius muscles are located in the upper back and neck and are involved in movements like shrugging and rotating the shoulders. Exercises like shoulder shrugs and upright rows target the trapezius.
  
      - **Rhomboids:** Located between the shoulder blades, the rhomboids contribute to scapular retraction. Rowing exercises help target the rhomboids.
  
      Strengthening the back is essential for maintaining a balanced and functional physique. Back exercises not only contribute to upper body strength but also play a key role in prExerciseing imbalances and promoting overall posture.
  
      Common exercises for the back include pull-ups, rows, lat pulldowns, and deadlifts. Incorporating these exercises into your fitness routine supports back health, enhances posture, and contributes to a well-developed upper body.
    `,
  });
  
  const bodyCategoriesArms = await Category.create({
    category_id: 6,
    image: '/Images/categoryImages/armsIcon.png',
    name: 'Arms',
    description: `
      The "Arms" refer to the upper limbs of the human body, including the shoulders, upper arms, forearms, and hands. Developing arm muscles not only contributes to aesthetic goals but also enhances functional strength and performance in various activities.
  
      Key muscle groups in the arms include:
  
      - **Biceps Brachii:** The biceps, located in the front of the upper arm, are responsible for elbow flexion. Exercises like bicep curls target the biceps.
  
      - **Triceps Brachii:** The triceps, located in the back of the upper arm, are responsible for elbow extension. Exercises like tricep dips and tricep extensions target the triceps.
  
      - **Forearm Muscles:** These muscles, including the flexors and extensors, play a role in wrist and hand movements. Grip strength exercises, wrist curls, and reverse curls target forearm muscles.
  
      Strengthening the arms contributes to overall upper body strength, functional fitness, and daily activities that involve lifting and carrying. Arm exercises are popular in fitness routines for sculpting and toning the upper body.
  
      Common exercises for the arms include bicep curls, tricep dips, hammer curls, and forearm exercises. Including a variety of arm exercises in your fitness routine helps target different muscle groups and promotes balanced arm development.
    `,
  });
  
  ////Add new Exercises\\\\
  const ExerciseGroup1 = [
{
  image: '/Images/exerciseImages/PullUp.png',
  name: 'Pull-Up',
  lvl: 'Beginner',
  video: 'https://www.youtube.com/watch?v=GBqAZP6jquc',
  techniqueSummary: 
  `
  1. Scapula depressed and retracted
  2. No swing
  3. Full range of motion (ROM)
  `,
  description:
  `
  **Description**
  The Pull-Up is a fundamental calisthenic exercise that serves as a prerequisite for mastering more advanced bar skills. The primary progression goal is to establish basic upper body strength, laying the foundation for achieving a Muscle Up.

  **Execution**:
  1. Begin in a dead hang position.
  2. Initiate the movement by depressing and retracting the scapula.
  3. Engage your biceps and back muscles to pull yourself up, aiming for your chin to surpass the bar or ideally, your chest to touch the bar.
  4. Descend slowly and with control back to the dead hang position.
  5. It's crucial to perform the full range of motion for maximum effectiveness.
  
  **Variations**:
  The Chin-Up, done with an underhand grip, differs from the overhand grip of the Pull-Up. The underhand grip causes your elbows to naturally bend more inward, targeting the biceps to a greater extent.
  The Pull-Up can also be performed on rings instead of bars.`,
  categories: [bodyCategoriesArms._id, bodyCategoriesBack._id]
},
{
  image: '/Images/exerciseImages/BodyRow.png',
  name: 'Body Row',
  lvl: 'Beginner',
  video: 'https://youtu.be/FnWrvWZDJTo?si=USJ22Yd9kJKUbQ1J',
  techniqueSummary: 
    `
    1. Straight body
    2. Scapula retracted
    `,
  description:
    `
    **Description**
    The Body Row is an excellent beginner exercise that targets the muscles of the upper back and arms. It is an effective way to build strength in the pulling muscles and is a great precursor to more challenging pulling exercises.

    **Execution**:
    1. Set up a bar at waist height.
    2. Lie on your back under the bar.
    3. Grab the bar with an overhand grip.
    4. Keep your body straight and pull your chest towards the bar.
    5. Lower your body back down with control.
    
    **Variations**:
    Adjust the difficulty by changing the height of the bar. A higher bar makes it easier, while a lower bar increases the challenge.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id]
},
{
  image: '/Images/exerciseImages/Dip.png',
  name: 'Dip',
  lvl: 'Beginner',
  video: 'https://www.youtube.com/watch?si=qv3Jsw7qHDr-4E9-&v=Z8C3d9Gcdk0&feature=youtu.be',
  techniqueSummary: 
    `
    1. Upright Body
    2. Elbows in
    3. Lower at least to 90 Degrees
    4. No Swing
    `,
  description:
    `
    **Description**
    The Dip is a foundational calisthenic exercise that targets the muscles of the chest, triceps, and shoulders. It is an excellent way to build upper body strength and is often used in various fitness routines.

    **Execution**:
    1. Use parallel bars or sturdy surfaces.
    2. Grip the bars with hands shoulder-width apart.
    3. Lower your body by bending your elbows.
    4. Keep your body upright and avoid leaning too far forward.
    5. Push through the bars to return to the starting position.
    
    **Variations**:
    To increase difficulty, add weight with a dip belt or perform deep dips for an extended range of motion.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesChest._id]
},
{
  image: '/Images/exerciseImages/PushUp.png',
  name: 'Push-Up',
  lvl: 'Beginner',
  video: 'https://www.youtube.com/watch?si=cxGleEi-vT7aYg-s&v=IODxDxX7oi4&feature=youtu.be',
  techniqueSummary: 
    `
    1. Start in a plank position with hands placed slightly wider than shoulder-width.
    2. Keep a straight line from head to heels.
    3. Lower your chest towards the ground by bending your elbows.
    `,
  description:
    `
    **Description**
    The Push-Up is a classic bodyweight exercise that targets the chest, shoulders, triceps, and core muscles. It is versatile and can be adapted for all fitness levels.

    **Execution**:
    1. Start in a plank position with hands placed slightly wider than shoulder-width.
    2. Keep a straight line from head to heels.
    3. Lower your chest towards the ground by bending your elbows.
    4. Ensure a full range of motion by bringing your chest close to the ground.
    5. Push through your palms to return to the starting position.
    
    **Variations**:
    Modify intensity by performing incline or decline push-ups. You can also experiment with hand placement for different muscle emphasis.
    `,
    categories:[bodyCategoriesArms._id, bodyCategoriesChest._id]
},
];

// Create an array to store exercise IDs
const G1exerciseIds = [];

// Loop through the Exercises array and save each exercise to get its ID
for (const ExerciseGroup1Data of ExerciseGroup1) {
  const newExercise = await findOrCreateExercise(ExerciseGroup1Data);
  G1exerciseIds.push(newExercise._id);
}

// Create the workout with the exercise IDs
const pushPullWorkout = await Workout.create({
  // userId: Admin._id,
  exerciseID: G1exerciseIds,
  name: 'Pull Push',
  image: '/Images/workoutImages/PushPull.png',
  lvl: 'Beginner'
});
console.log(`Workout "${pushPullWorkout.name}" created with exercises:`, G1exerciseIds);

const ExerciseGroup2 = [
  {
    image: '/Images/exerciseImages/HighPullUp.png',
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
    image: '/Images/exerciseImages/PullUp.png',
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
    image: '/Images/exerciseImages/StraightBarDip.png',
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
    image: '/Images/exerciseImages/PushUp.png',
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

const G2exerciseIds = [];
  
for (const ExerciseGroup2Data of ExerciseGroup2) {
  const newExercise = await findOrCreateExercise(ExerciseGroup2Data);
  G2exerciseIds.push(newExercise._id);
}

const highPushPullWorkout = await Workout.create({
  // userId: Admin._id,
  exerciseID: G2exerciseIds,
  name: 'High Pull Push',
  image: '/Images/workoutImages/HighPushPull.png',
  lvl: 'Beginner'
});
console.log(`Workout "${highPushPullWorkout.name}" created with exercises:`, G2exerciseIds);


const ExerciseGroup3 = [
  {
    image: '/Images/exerciseImages/JumpingMuscleUp.png',
    name: 'Jumping Muscle Up',
    lvl: 'Intermediate',
    video: 'https://youtu.be/-m2Joe4BjcA?si=Vp09FyBHx-jsWNBn',
    techniqueSummary: `
      1. Jump up and back
      2. Rotate wrists
      3. Shoulders over the bar
      4. Elbows pull back
    `,
    description: `
      **Description:**
      The Jumping Muscle Up is an intermediate-level calisthenic exercise that combines explosive jumping power with precise upper body movements. This exercise targets multiple muscle groups and requires coordination for a successful transition over the bar.
  
      **Execution:**
      1. Find a lower bar or a sturdy surface to jump off.
      2. Position your feet below the bar and grip it with a grip slightly wider than shoulder-width.
      3. Initiate the movement by jumping up and back, using your legs to provide additional height.
      4. As you ascend, rotate your wrists to position them above the bar.
      5. Ensure your shoulders are directly over the bar, and pull your elbows back to facilitate the transition.
      6. Simultaneously, tighten your core and pull the bar toward your body.
      7. It's crucial not to rely solely on leg power; instead, use the jump to initiate the movement.
      8. You can adjust the difficulty by varying the distance between your feet and the bar during setup.
  
      Notice the importance of wrist rotation during the transition to ensure they are positioned above the bar, facilitating a smooth movement.
  
      **Tips:**
      - Use controlled and coordinated movements.
      - Practice the jump and transition separately before combining them.
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id]
  },  
  {
    image: '/Images/exerciseImages/HighPullUp.png',
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
    image: '/Images/exerciseImages/PullUp3x7.png',
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
    image: '/Images/exerciseImages/StraightBarDip.png',
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

const G3exerciseIds = [];
  
for (const ExerciseGroup3Data of ExerciseGroup3) {
  const newExercise = await findOrCreateExercise(ExerciseGroup3Data);
  G3exerciseIds.push(newExercise._id);
}

const MuscleUpStartJumping = await Workout.create({
  // userId: Admin._id,
  exerciseID: G3exerciseIds,
  name: 'Muscle Up Start (Jumping)',
  image: '/Images/workoutImages/JumpingmuscleUpstart.png',
  lvl: 'Intermediate'
});
console.log(`Workout "${MuscleUpStartJumping.name}" created with exercises:`, G3exerciseIds);

const ExerciseGroup4 = [
  {
    image: '/Images/exerciseImages/KippingMuscleUp.png',
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
    image: '/Images/exerciseImages/HighPullUp.png',
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
    image: '/Images/exerciseImages/NegativeMuscleUp.png',
    name: 'Negative Muscle Up',
    lvl: 'Intermediate',
    video: 'https://youtu.be/70y7r0vBddM?si=MmIrEZ5rXYcnpFb_',
    techniqueSummary: `
      1. Slow
    `,
    description: `
      **Description:**
      The Negative Muscle Up is an intermediate calisthenic exercise that focuses on the eccentric (lowering) phase of the Muscle Up. By performing a controlled descent from the top position to a dead hang, this exercise enhances strength and stability in preparation for the full Muscle Up.
  
      **Execution:**
      1. Start in the support position, using a lower bar, jumping up, or transitioning from a Pullover exercise to get on top.
      2. Slowly lower yourself with a smooth transition until you reach a dead hang position.
      3. Pay close attention to executing the exercise as slowly as possible to maximize the eccentric loading on the muscles.
      4. Keep your elbows in throughout the movement, maintaining proper form for the upward phase of the Muscle Up.
      
      **Tips:**
      - Control the descent to challenge your muscles and build strength.
      - Focus on a smooth transition during the lowering phase to mimic the Muscle Up movement.
      - Keeping your elbows in is crucial for reinforcing the correct muscle engagement.
  
      *Note: Timestamp "3:06" may indicate a specific point in the video for additional guidance.*
    `,
    categories: [bodyCategoriesArms._id, bodyCategoriesBack._id, bodyCategoriesChest._id]
  },  
  {
    image: '/Images/exerciseImages/StraightBarDip.png',
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

const G4exerciseIds = [];
  
for (const ExerciseGroup4Data of ExerciseGroup4) {
  const newExercise = await findOrCreateExercise(ExerciseGroup4Data);
  G4exerciseIds.push(newExercise._id);
}

const KippingMuscleUp = await Workout.create({
  // userId: Admin._id,
  exerciseID: G4exerciseIds,
  name: 'Kipping Muscle Up',
  image: '/Images/workoutImages/KippingMuscleUp.png',
  lvl: 'Intermediate'
});
console.log(`Workout "${KippingMuscleUp.name}" created with exercises:`, G4exerciseIds);


const ExerciseGroup5 = [
  {
    image: '/Images/exerciseImages/MuscleUp.png',
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
    image: '/Images/exerciseImages/KippingMuscleUp.png',
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
    image: '/Images/exerciseImages/PullUp.png',
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
    image: '/Images/exerciseImages/StraightBarDip.png',
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
  image: '/Images/workoutImages/MuscleUp.png',
  lvl: 'Advanced'
});

console.log(`Workout "${MuscleUp.name}" created with exercises:`, G5exerciseIds);

 ////Add new Skills\\\\
// Create an array to store workout IDs
const MuscleUpWorkoutIds = [pushPullWorkout._id, highPushPullWorkout._id, MuscleUpStartJumping._id, KippingMuscleUp._id, MuscleUp._id ];

// Create the skill with the workout IDs
const MuscleUpSkill = await Skill.create({
  userId: Admin._id, // Associate it with Admin
  workoutID: MuscleUpWorkoutIds,
  name: 'Muscle Up',
  image: '/Images/skillImages/MuscleUp.png',
});
console.log(`Skill "${MuscleUpSkill.name}" created with workouts:`, MuscleUpWorkoutIds);

const PlancheWorkoutIds = [];
const PlancheSkill = await Skill.create({
  userId: Admin._id,
  workoutID: PlancheWorkoutIds,
  name: 'Planche',
  image: '/Images/skillImages/Planche.png',
});
console.log(`Skill "${PlancheSkill.name}" created with workouts:`, PlancheWorkoutIds);

const FrontLeverWorkoutIds = [];
const FrontLeverSkill = await Skill.create({
  userId: Admin._id,
  workoutID: FrontLeverWorkoutIds,
  name: 'Front Lever',
  image: '/Images/skillImages/FrontLever.png',
});
console.log(`Skill "${FrontLeverSkill.name}" created with workouts:`, FrontLeverWorkoutIds);

const BackLeverWorkoutIds = [];
const BackLeverSkill = await Skill.create({
  userId: Admin._id,
  workoutID: BackLeverWorkoutIds,
  name: 'Back Lever',
  image: '/Images/skillImages/BackLever.png',
});
console.log(`Skill "${BackLeverSkill.name}" created with workouts:`, BackLeverWorkoutIds);

const PistolSquatWorkoutIds = [];
const PistolSquatSkill = await Skill.create({
  userId: Admin._id,
  workoutID: PistolSquatWorkoutIds,
  name: 'Pistol Squat',
  image: '/Images/skillImages/PistolSquat.png',
});
console.log(`Skill "${PistolSquatSkill.name}" created with workouts:`, PistolSquatWorkoutIds);

const HandstandPushUpWorkoutIds = [];
const HandstandPushUpSkill = await Skill.create({
  userId: Admin._id,
  workoutID: HandstandPushUpWorkoutIds,
  name: 'Handstand Push Up',
  image: '/Images/skillImages/HandstandPushUp.png',
});
console.log(`Skill "${HandstandPushUpSkill.name}" created with workouts:`, HandstandPushUpWorkoutIds);

const VSitWorkoutIds = [];
const VSitSkill = await Skill.create({
  userId: Admin._id,
  workoutID: VSitWorkoutIds,
  name: 'V-Sit',
  image: '/Images/skillImages/VSit.png',
});
console.log(`Skill "${VSitSkill.name}" created with workouts:`, VSitWorkoutIds);

const OneArmPullUpWorkoutIds = [];
const OneArmPullUpSkill = await Skill.create({
  userId: Admin._id,
  workoutID: OneArmPullUpWorkoutIds,
  name: 'One Arm Pull Up',
  image: '/Images/skillImages/OneArmPullUp.png',
});
console.log(`Skill "${OneArmPullUpSkill.name}" created with workouts:`, OneArmPullUpWorkoutIds);

const HumanFlagWorkoutIds = [];
const HumanFlagSkill = await Skill.create({
  userId: Admin._id,
  workoutID: HumanFlagWorkoutIds,
  name: 'Human Flag',
  image: '/Images/skillImages/HumanFlag.png',
});
console.log(`Skill "${HumanFlagSkill.name}" created with workouts:`, HumanFlagWorkoutIds);

const OneArmPushUpWorkoutIds = [];
const OneArmPushUpSkill = await Skill.create({
  userId: Admin._id,
  workoutID: OneArmPushUpWorkoutIds,
  name: 'One Arm Push Up',
  image: '/Images/skillImages/OneArmPushUp.png',
});
console.log(`Skill "${OneArmPushUpSkill.name}" created with workouts:`, HumanFlagWorkoutIds);

const OneArmHandstandWorkoutIds = [];
const OneArmHandstandSkill = await Skill.create({
  userId: Admin._id,
  workoutID: OneArmHandstandWorkoutIds,
  name: 'One Arm Handstand',
  image: '/Images/skillImages/OneArmHandstand.png',
});
console.log(`Skill "${OneArmHandstandSkill.name}" created with workouts:`, OneArmHandstandWorkoutIds);


const ShrimpSquatWorkoutIds = [];
const ShrimpSquatSkill = await Skill.create({
  userId: Admin._id,
  workoutID: ShrimpSquatWorkoutIds,
  name: 'Shrimp Squat',
  image: '/Images/skillImages/ShrimpSquat.png',
});
console.log(`Skill "${ShrimpSquatSkill.name}" created with workouts:`, ShrimpSquatWorkoutIds);


const HefestoWorkoutIds = [];
const HefestoSkill = await Skill.create({
  userId: Admin._id,
  workoutID: HefestoWorkoutIds,
  name: 'Hefesto',
  image: '/Images/skillImages/Hefesto.png',
});
console.log(`Skill "${HefestoSkill.name}" created with workouts:`, HefestoWorkoutIds);

const DragonFlagWorkoutIds = [];
const DragonFlagSkill = await Skill.create({
  userId: Admin._id,
  workoutID: DragonFlagWorkoutIds,
  name: 'Dragon Flag',
  image: '/Images/skillImages/DragonFlag.png',
});
console.log(`Skill "${DragonFlagSkill.name}" created with workouts:`, DragonFlagWorkoutIds);

};

seedAll = async () => {
  await db.dropDatabase();
  console.log('droppedDB');
  await main();
  console.log('completed main');
  await db.close();
  console.log('closed db');
};

seedAll();
