import { media } from './media';

// Completed Structural Health Monitoring projects — the project posts of the
// live site. Slugs match the old WordPress URLs (redirected from /<slug>/).

export const projects = [
    {
        slug: "navadgi-bridge",
        title: "Navadgi Bridge",
        workType: "Rail Structure Interaction (RSI) Validation",
        subject: "Bridge No. 175 - Navadgi",
        client: "South Central Railway, India",
        images: media["projects/navadgi-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["This bridge is constructed on the river with pre-stressed concrete ‘I’ Girder supported on circular pier. The overall length of bridge is 81.00 m comprising 4 spans of each 20.00 m."] },
            { heading: "Scope of Work", paragraphs: ["The scope of work includes finding out the following parameters. Maximum horizontal displacement of the deck due to longitudinal loads. Relative displacement between rail and deck due to longitudinal loads. Additional tensile and compressive stresses in rails due to thermal loads in summer. Finding out the Maximum displacement in the deck due to rotation. Maximum vertical displacement of the deck at ends. Numerical Modelling and analysis. Generation of Finite element model using MIDAS."] },
            { heading: "Objective", paragraphs: ["Rail structure interaction study is carried out to workout forces induced on rails, bridge components due to interaction effects and assess the safety due to these interaction forces on CWR. The interaction takes place due to expansion or contraction of deck and rails under change of temperature, longitudinal deformation of sub structure under braking, tractive forces from rolling stock and vertical bending/flexure of deck under live loads. SWR allows movements freely under thermal and live load effects whereas the rails as part of CWR doesn’t allow free moments and hence a separate analysis is required for study of interaction forces is required."] },
        ],
    },
    {
        slug: "jagdalpur-bridge",
        title: "Jagdalpur Bridge",
        workType: "Rail Structure Interaction (RSI) Validation",
        subject: "Bridge No. 832 - Jagdalpur",
        client: "East Coast Railway, India",
        images: media["projects/jagdalpur-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["This bridge is constructed on the canal with a composite Girder. The overall length of the bridge is 61.00 m comprising 3 spans."] },
            { heading: "Scope of Work", paragraphs: ["Scope of work includes finding out the following parameters like the interaction takes place due to expansion or contraction of deck and rails under change of temperature, longitudinal deformation of sub structure under braking, tractive forces from rolling stock (locomotive, wagons, other railway vehicles) and vertical bending/flexure of the deck under live loads."] },
            { heading: "Objective", paragraphs: ["Bridge and track are interlinked, regardless of whether the system used for the track is the ballasted bed or it is directly fastened. Any force or deformation imposed on the track above or close to the bridge structure will result in a force and deformation on the bridge structure or vice versa. So the rail structure interaction study is carried out to work out forces induced on rails, and bridge components due to interaction effects and assess the safety due to these interaction forces."] },
        ],
    },
    {
        slug: "raipur-bridge",
        title: "Raipur Bridge",
        workType: "Rail Structure Interaction (RSI) Validation",
        subject: "Bridge No. 176 Between Khariar-Nawapara Stations",
        client: "East Coast Railway, India",
        images: media["projects/raipur-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["This bridge is constructed on the river with Pre-stressed concrete ‘I’ Girder supported on the circular pier. The overall length of the bridge is 36.60 m comprising 3 spans of each 12.20 m."] },
            { heading: "Scope of Work", paragraphs: ["Scope of work includes finding out the following parameters. Maximum horizontal displacement of the deck due to longitudinal loads. Relative displacement between rail and deck due to longitudinal loads. Additional tensile and compressive stresses in rails due to thermal loads in summer. Finding out the Maximum displacement in the deck due to rotation. Maximum vertical displacement of the deck at ends. Numerical Modelling and analysis. Generation of Finite element model using MIDAS."] },
            { heading: "Objective", paragraphs: ["The rail structure interaction study is carried out to workout forces induced on rails, and bridge components due to interaction effects and assess the safety due to these interaction forces on CWR. The interaction takes place due to the expansion or contraction of the deck and rails under a change of temperature, longitudinal deformation of the sub-structure under braking, tractive forces from rolling stock, and vertical bending/flexure of the deck under live loads. SWR allows movements freely under thermal and live load effects whereas the rails as part of CWR don’t allow free moments and hence a separate analysis is required for the study of interaction forces is required."] },
        ],
    },
    {
        slug: "mancherial-godavari-bridge",
        title: "Mancherial Godavari Bridge",
        workType: "Structural Condition Assessment",
        subject: "Bridge No. 142 – Mancherial Stone Masonry",
        client: "South Central Railway, India",
        images: media["projects/mancherial-godavari-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["This bridge is constructed on the river with Pre-stressed concrete ‘I’ Girder supported on the circular pier. The overall length of the bridge is 36.60 m comprising 3 spans of each 12.20 m."] },
            { heading: "Scope of Work", paragraphs: ["Instrumentation for Structural condition assessment & validation of results by evaluation of natural frequencies, stiffness, and parameters by Ambient Vibration Test (AVT), OMA, and Numerical modal analysis."] },
            { heading: "Objective", paragraphs: ["As the bridge is constructed long back, the structure bridge is being deteriorated over the period. The condition of the bridge must be monitored and assessed for the aim of keeping safety and facilitating maintenance."] },
            { heading: "Outcome", paragraphs: ["The natural frequencies of piers and girders have been obtained from Numerical modal analysis, AVT, and compared to identify the critical piers. The Bridge pier’s stiffness and damping properties under dynamic loads are derived. Identifying critical piers and the recommendation will be suggested for strengthening if necessary."] },
        ],
    },
    {
        slug: "gadwal-bridge",
        title: "Gadwal Bridge",
        workType: "Vibration Analysis",
        subject: "Bridge No. 375 – Gadwal Before and After Bearing Replacement",
        client: "South Central Railway, India",
        images: media["projects/gadwal-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["The bridge is constructed across Okku Setty river which is a tributary river of Krishna. The overall length of bridge is 254.40m with 21 spans of 12.20 m. The superstructure of bridge is PSC box girders supported on RCC piers and resting on open foundation."] },
            { heading: "Scope of Work", paragraphs: ["Carrying out visual inspection, Ambient Vibration Test (AVT) to check condition of bridge and to identify the system properties for bridge deck. Accelerometer sensors are used to record the vibration data from current ongoing traffic/train before and after bearing replacement on the bridge."] },
            { heading: "Objective", paragraphs: ["The Structural Health Monitoring system is designed to compare and analyse the of vibrations and displacements on the bridge due to different live loads from train. The elastomeric bearings of the bridge has exceeded the service life of more than 20 years. The bearings at most of the locations has been worn out, bulged and damaged. Due to nonfunctioning of bearings higher stresses, vibrations were evident. The objective of te project is to compare the vibrations experienced on the structure before and after replacement of bearings."] },
            { heading: "Outcome", paragraphs: ["Comparison, analysis of vibrations, FFT plots and displacement of the structure before and after replacement of elastomeric bearings."] },
        ],
    },
    {
        slug: "rajamundry-bridge",
        title: "Rajahmundry Bridge",
        workType: "Structural Health Monitoring",
        subject: "Bridge No. 248 – Rajahmundry Bow String Arch Bridge",
        client: "East Coast Railway, India",
        images: media["projects/rajamundry-bridge"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["The III-Godavari Bridge consists of PSC boxes with Bowstring arches and having 28 spans of 97.552m each. The bridge was opened for rail transport in 1997. The prestressed box is connected to the twin RCC arches by means of 12 DINA hangers. The bridge is one of the iconic constructions built across Godavari bridge on Kovvuru Rajhamundry section."] },
            { heading: "Scope of Work", paragraphs: ["Visual inspection of bridge. Checking existing profile of superstructure i.e., Arch, Tie girder & compare with original profile. Strain in all DINA Hangers and observations of expansion/contraction during live loads at different speeds of passenger and Goods trains to assess the behavior of Hangers. Measuring existing camber, bearing moments and checking with design standards. Carrying out Ambient Vibration Test (AVT) using Tri Axial Accelerometer sensors to record the vibrations of deck, Deflections / displacements of Deck & Soffit slabs of Tie Girder at different loading conditions at different speeds and Observation of Tilt on Piers."] },
            { heading: "Objective", paragraphs: ["The Structural health monitoring of Godavari bridge is emphasized to understand the condition of several structural members like DINA hangers, RCC arches, irregularities/distress in the Cables, calculate cable force, check the profile of members, camber measurement, check excessive moments, vibrations, loss in prestress forces etc."] },
        ],
    },
    {
        slug: "bridge-between-rahenbhata-titlagarh-station",
        title: "Bridge between Rahenbhata-Titlagarh station",
        workType: "Rail Structure Interaction (RSI) Validation",
        subject: "Bridge No. 325 between Rahenbhata-Titlagarh stations",
        client: "East Coast Railway, India",
        images: media["projects/bridge-between-rahenbhata-titlagarh-station"],
        sections: [
            { heading: "Overview of the Structure", paragraphs: ["This bridge is constructed on the river with Pre-stressed concrete ‘I’ Girder supported on circular pier. The overall length of bridge is 36.60 m comprising 3 spans of each 12.20 m."] },
            { heading: "Scope of Work", paragraphs: ["The scope of work includes finding out the following parameters.", "Maximum horizontal displacement of deck due to longitudinal loads. Relative displacement between rail and deck due to longitudinal loads. Additional tensile and compressive stresses in rails due to thermal loads in summer. Finding out the Maximum displacement in deck due to rotation. Maximum vertical displacement of deck at ends. Numerical Modelling and analysis. Generation of Finite element model using MIDAS."] },
            { heading: "Objective", paragraphs: ["Rail structure interaction study is carried out to workout forces induced on rails, bridge components due to interaction effects and assess the safety due to these interaction forces on CWR. The interaction takes place due to expansion or contraction of deck and rails under change of temperature, longitudinal deformation of sub structure under braking, tractive forces from rolling stock and vertical bending/flexure of deck under live loads. SWR allows movements freely under thermal and live load effects whereas the rails as part of CWR doesn’t allow free moments and hence a separate analysis is required for study of interaction forces is required."] },
        ],
    },
];

export const findProject = (slug) => projects.find((p) => p.slug === slug);
