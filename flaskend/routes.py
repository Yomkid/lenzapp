from datetime import datetime
from flask import request, jsonify
from models import db, User, Attendance, Classes

@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    student_id = request.json['student_id']
    class_id = request.json['class_id']
    timestamp = datetime.now()

    # Check if the student is already marked present
    existing_attendance = Attendance.query.filter_by(userID=student_id, classID=class_id, date=timestamp.date()).first()
    if existing_attendance:
        return jsonify({'message': 'Attendance already marked for today.'}), 400

    # Create new attendance record
    new_attendance = Attendance(userID=student_id, classID=class_id, date=timestamp, status='Present')
    db.session.add(new_attendance)
    db.session.commit()
    return jsonify({'message': 'Attendance marked successfully!'}), 200
________________________________________
