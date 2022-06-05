/*
   Draws a flower petal with both motors for demo purposes
   Try difference between SyncDriver and MultiDriver

   Adapted 2021/2022 by Gordan Savicic
   based on stepperdriver example Copyright (C)2015-2017 Laurentiu Badea

   This file may be redistributed under the terms of the MIT license.
   A copy of this license has been included with this distribution in the file LICENSE.
*/
#include <Arduino.h>
#include "BasicStepperDriver.h"
#include "MultiDriver.h"
#include "SyncDriver.h"

// Motor steps per revolution. Most steppers are 200 steps or 1.8 degrees/step
#define MOTOR_STEPS 800
#define RPM 600

// Since microstepping is set externally, make sure this matches the selected mode
// If it doesn't, the motor will move at a different RPM than chosen
// 1=full step, 2=half step etc.
#define MICROSTEPS 15

// All the wires needed for full functionality
#define DIR_L 5
#define STEP_L 2

#define DIR_R 6
#define STEP_R 3
// Uncomment line to use enable/disable functionality
#define SLEEP 8

// 2-wire basic config, microstepping is hardwired on the driver
// BasicStepperDriver stepper(MOTOR_STEPS, DIR, STEP);

// Uncomment line to use enable/disable functionality
BasicStepperDriver stepperL(MOTOR_STEPS, DIR_L, STEP_L, SLEEP);
BasicStepperDriver stepperR(MOTOR_STEPS, DIR_R, STEP_R, SLEEP);

//MultiDriver controller(stepperL, stepperR);
MultiDriver controller(stepperL, stepperR);

//const float full_rotation_R = MOTOR_STEPS * MICROSTEPS * 2.5;
const float rotation_R = MOTOR_STEPS * MICROSTEPS * 0.3;
const float back_rotation_R = MOTOR_STEPS * MICROSTEPS * -0.2;
const float rotation_L = MOTOR_STEPS * MICROSTEPS * 0.5;
const float back_rotation_L = MOTOR_STEPS * MICROSTEPS * -0.5;
const int step_size_L = 140;



void setup()
{
  
  stepperL.begin(RPM, MICROSTEPS);
  stepperR.begin(RPM, MICROSTEPS);
  // this is needed for enabling/disabling steppers 
  stepperL.setEnableActiveState(LOW);
  stepperR.setEnableActiveState(LOW);
  
  stepperR.enable();
  stepperL.enable();

 
}

void loop()
{

    controller.move(rotation_L, rotation_R);
    controller.move(rotation_R, back_rotation_L); 

}
