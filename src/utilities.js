
const fingerJoints = {
    thumb: [0,1,2,3,4],
    indexFinger: [0,5,6,7,8],
    middleFinger: [0,9,10,11,12],
    ringFinger: [0,13,14,15,16],
    pinkyFinger: [0,17,18,19,20]
}



// Drawing function
export const DrawHand = (predictions, ctx) => {

    // Check if we have predictions
    console.log(predictions);
    if (predictions.length > 0) {

        // Get predictions
        predictions.forEach(prediction => {
            // Get landmarks
            const landmarks = prediction.keypoints;

            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j];
                //  Loop through pairs of joints
                for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                  // Get pairs of joints
                  const firstJointIndex = fingerJoints[finger][k];
                  const secondJointIndex = fingerJoints[finger][k + 1];
        
                  // Draw path
                  ctx.beginPath();
                  ctx.moveTo(
                    landmarks[firstJointIndex].x,
                    landmarks[firstJointIndex].y
                  );
                  ctx.lineTo(
                    landmarks[secondJointIndex].x,
                    landmarks[secondJointIndex].y
                  );
                  ctx.strokeStyle = "plum";
                  ctx.lineWidth = 4;
                  ctx.stroke();
                }
              }
        





            // Loop through landmarks and draw them
            console.log(landmarks);
            for (let i=0; i < landmarks.length; i++) {
                // Get x
                const x = landmarks[i].x;
                // Get y 
                const y = landmarks[i].y;

                


                ctx.beginPath();
                ctx.arc(x, y, 1, 0, 3*Math.PI);

                // Set line fill colour
                ctx.follStyle = "indigo";
                ctx.fill();


            }

        });
    }
}