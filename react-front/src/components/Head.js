// src/components/Head.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Head = () => (
    <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Bootstrap CSS */}
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

        {/* Internal links */}
        <link href="assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
        <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
        <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet" />

        {/* Custom CSS */}
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link rel="stylesheet" href="/assets/css/course.css" />
        <link rel="stylesheet" href="/assets/css/home.css" />

        {/* jQuery and other scripts */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <style>{`
            /* Global styles for anchor tags */
            a {
                color: inherit;
                text-decoration: none;
            }
            a:hover {
                color: #0056b3;
                text-decoration: underline;
            }
            .course-card-homepage .course-price {
                font-size: 1.1rem;
                color: #e74c3c;
                font-weight: bold;
            }
        `}</style>
    </Helmet>
);

export default Head;
