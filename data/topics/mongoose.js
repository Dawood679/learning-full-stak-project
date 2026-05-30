export const mongooseContent = {
  slug: "mongoose",
  briefDescription: [
    "Mongoose is the most popular Object Document Mapper (ODM) for MongoDB and Node.js. It provides schema-based modeling on top of MongoDB's flexible document model — giving you validation, middleware (hooks), virtuals, and type casting.",
    "Mongoose schemas define the shape of documents within a collection. You can add validators, default values, custom getters/setters, and instance/static methods directly on the schema — keeping your data logic close to your models.",
    "Mongoose middleware (pre/post hooks) run at defined points of the document lifecycle: before save, before find, after validate, etc. This is ideal for hashing passwords, updating timestamps, and cascading deletes.",
  ],
  keyConcepts: [
    "Schema types: String, Number, Date, Boolean, ObjectId, Mixed, Array",
    "Model methods: save(), findById(), findByIdAndUpdate(), populate()",
    "Validators: required, min/max, enum, custom validate()",
    "Pre/post hooks: pre('save'), pre('find'), post('save')",
    "Virtual fields: computed properties not stored in DB",
    "populate() for joining referenced documents",
    "Query builder: chaining .where().sort().limit().skip()",
    "Plugins: reusable schema extensions",
  ],
  codeExample: {
    language: "javascript",
    title: "Schema with Hooks, Virtuals & Population",
    code: `const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  firstName: String,
  lastName: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true })

// Virtual: full name (not stored in DB)
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`
})

// Pre-save hook: hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method: compare passwords
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

const User = mongoose.model('User', userSchema)

// Usage: populate posts
const user = await User
  .findById(userId)
  .populate('posts', 'title createdAt')
  .lean()`,
  },
}
