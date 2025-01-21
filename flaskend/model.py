from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/attendance_system'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    userID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    embeddings = db.Column(db.Text)
    userType = db.Column(db.Enum('student', 'instructor'))
    password = db.Column(db.String(100))
    classes = db.Column(db.Text)

class Attendance(db.Model):
    __tablename__ = 'attendance'
    attendanceID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'))
    classID = db.Column(db.Integer, db.ForeignKey('classes.classID'))
    date = db.Column(db.DateTime)
    status = db.Column(db.Enum('Present', 'Absent'))

class Classes(db.Model):
    __tablename__ = 'classes'
    classID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    schedule = db.Column(db.Text)
    instructorID = db.Column(db.Integer, db.ForeignKey('users.userID'))
