from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True,nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    salt = db.Column(db.String(180))
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    create_at = db.Column(db.DateTime(timezone=True), default=db.func.now(), nullable=False)
   

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
           "id": self.id,
            "email": self.email,
            "firstName":self.firstName,
            "lastName":self.lastName,
            "username":self.username,
            "is_active": self.is_active,
            "create_at": self.create_at
            # do not serialize the password, its a security breach
        }
    