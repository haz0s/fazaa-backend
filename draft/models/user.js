// src/models/user.js

const bcrypt = require("bcrypt");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password; // Store hashed password
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

module.exports = User;
