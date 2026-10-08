import { media } from './media';

// Structural Health Monitoring, Assessment & Rehabilitation — the content of
// the live site's SHM page, structured for ShmPage.

const shmImage = (name) => media.shm.find((m) => m.src.includes(`/${name}.webp`));

export const shm = {
    intro:
        'We provide solutions for health monitoring & assessment of civil structures for understanding the global behavior by instrumentation at strategic locations. Finding parameters such as acceleration, modal frequencies, displacements, stresses, strains, and forces induced under dynamic loading.',
    introImages: [shmImage('shm-6'), shmImage('mancherial-godavari-bridge-3'), shmImage('mancherial-godavari-bridge-2')],

    services: [
        'Structural Health Monitoring',
        'Long-Term Live Monitoring of Structures',
        'Rail Structure Interaction studies and Instrumentation Works on Railway Bridges',
        'Bridge Load Testing',
        'Non-destructive / Semi-destructive testing to check the Integrity of Structures',
        'Condition Assessment and Condition Mapping',
        'Consultancy Services for suggesting Remedial Measures, Structural Strengthening, and Rehabilitation',
        'Pier Tilt / Rotation Monitoring',
        'Scour Monitoring',
        'Water Level Monitoring',
        'Drone Inspection',
        'Complete Temperature Monitoring',
        'Strain Monitoring',
    ],

    infrastructure: {
        text: 'We have been collaborating closely with various research institutes to integrate the hardware and software at our own laboratory to make use of various sensors, automated data collection and analysis for structural monitoring for a complete Design-to-Service Solution.',
        sensors: [
            'Accelerometer',
            'Inclinometer/Tilt Sensors',
            'LASER scanning',
            'IoT devices',
            'RFIDs (Radio Frequency Identification)',
            'Acoustic emissions',
            'MEMS',
            'Velocity Transducers',
            'Temperature Sensors',
            'GPS',
            'Weather Stations',
            'Water Level Monitoring',
            'Scour Monitoring',
            'Strain Measurement',
        ],
    },

    whatIs: {
        text: 'The process of systematizing damage detection and characterization techniques. It is a non-destructive in-situ structural evaluation method that involves several types of sensors embedded or attached to the structures for the purpose of assessing the actual conditions of the structures. Global and local structural behavior are considered on the basis of real-time data aggregation.',
        images: [shmImage('shm-3'), shmImage('1')],
    },

    why: 'SHM provides a tool to ensure structural integrity and safety, detecting the growth of damages, and evaluating the performance of infrastructures.',

    applications: {
        lead: 'SHM work for critical structures like:',
        items: [
            'Bridges',
            'Rail Structures',
            'Wind Turbines',
            'Tunnels',
            'Power Plants and Dams',
            'Historic Buildings',
            'Offshore Structures (Ports, Harbors)',
            'All Types of Structural Applications',
        ],
        image: shmImage('applications-of-shm'),
    },

    involves: [
        'Assessing Performance of Existing Structures',
        'Identifying Structures Responses',
        'Estimating Performance of the Structures for the future loads',
        'Residual life assessment of structures',
        'Continuous Monitoring of Structures',
        'Operational Evaluation',
        'Improve Performance (Safety and Functionality) of Existing Structures',
    ],

    phases: {
        image: shmImage('image-043'),
        steps: [
            {
                title: 'Installation Preprocessing',
                points: [
                    'Initial site visit and investigation to find and install the exact locations of the sensors.',
                    'Make the surface suitable for installation of sensors with help of epoxy glue, magnetic base, clamps etc.',
                    "Some sensors can be fixed directly on the structural elements, or else using an 'L' clamp for sensor installation.",
                ],
            },
            {
                title: 'Power Supply',
                points: ['Most of the instruments work with DC power. We prefer solar, battery power, generator and direct power supplies.'],
            },
            {
                title: 'Sensors',
                points: [
                    'We use various sensors for various applications.',
                    'Like accelerometer, tilt meter, strain gauge, displacement sensor, temperature sensor, load cell etc.',
                ],
            },
            {
                title: 'Data Aggregator',
                points: [
                    'Data acquisition from wireless and inertial sensors. Aggregator collecting sensor data.',
                    'From this aggregator we can directly collect sensor data through Ethernet & SensorCloud, MicroUSB.',
                    'Data is securely stored, viewed and analytic operations/alert set up.',
                ],
            },
            {
                title: 'Software',
                points: [
                    'SensorConnect is specially designed software for plotting the aggregator received data.',
                    'MATLAB for relative displacement and velocity. Most of the instrument manufacturers provide their own software for analysis.',
                    'Structural Modelling & Analysis by MIDAS, ANSYS, STAAD Pro.',
                ],
            },
        ],
    },

    instrumentation: [
        {
            title: 'Accelerometer Sensor',
            image: shmImage('shm-1-1'),
            text: [
                'The triaxial accelerometer allows high-resolution data acquisition. It can record vibrations up to ±8g with extremely low noise and drift. Derived vibration parameters allow for logarithmic monitoring of key performance indicators.',
                'These wireless sensing systems are ideal for testing and measurement, remote monitoring, system performance analysis, and embedded applications.',
            ],
        },
        {
            title: 'Strain Gauge Sensor',
            image: shmImage('shm-7'),
            text: [
                'A strain gauge is a sensor whose resistance varies with applied force; it converts force, pressure, tension, weight, etc., into a change in electrical resistance which can then be measured.',
                'When external forces are applied to a stationary object, stress and strain are the result.',
            ],
        },
        {
            title: 'Displacement Sensors',
            image: shmImage('displacement-sensor-500x500-1'),
            text: [
                'An LVDT consists of a metal rod that moves inside an electrical coil. A force applied to the rod results in a displacement that affects the inductance of the coil.',
                'It is a common type of electromechanical transducer that can convert the rectilinear motion of an object to which it is coupled mechanically into a corresponding electrical signal.',
            ],
        },
        {
            title: 'Load Cell',
            image: shmImage('image-061'),
            text: [
                'The most used load cell is the strain gauge load cell. Several strain gauges are mounted in a Wheatstone bridge configuration so that the application of a force causes a strain in the assembly the strain gauges are measuring.',
                'These devices are calibrated so that the force is directly related to the resistance change. Pneumatic and hydraulic load cells translate force into pressure measurements.',
                'When force is applied to one side of the piston or diaphragm, the amount of pressure (pneumatic or hydraulic) applied to the other side to balance that force is measured.',
            ],
        },
    ],

    installationTypes: [
        {
            title: 'Long Term – Real Time Health Assessment',
            image: shmImage('image-069'),
            points: [
                'Long-term – Real-Time Health monitoring',
                'One month to an unlimited number of months of continuous recording',
                'Offline, Online, and Cloud data aggregations',
            ],
        },
        {
            title: 'Short Term – Real Time Health Assessment',
            image: shmImage('2022-11-09-15h06-46'),
            points: [
                'Short-term – Real-Time Health Monitoring',
                'Summer, Winter, as the client requests',
                'Offline, Online, Onsite, and Cloud data aggregations',
            ],
        },
        {
            title: 'Permanent Installation While Construction',
            image: shmImage('image-071'),
            points: [
                'Permanently installed while construction',
                "It's a lifelong monitoring methodology",
                'Low-cost instruments',
                'Internal monitoring method',
            ],
        },
    ],
};
