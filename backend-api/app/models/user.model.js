module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        email: { type: String, required: true, unique: true },
        password: String,
        dob: String,
        gender: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };
  