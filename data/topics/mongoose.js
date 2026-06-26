export const mongooseContent = {
  slug: "mongoose",
  briefDescription: [
    "Mongoose is the most popular ODM (Object Document Mapper) for connecting MongoDB to Node.js. You install it with 'npm install mongoose' and connect with mongoose.connect(MONGODB_URI). A Mongoose Schema is a blueprint that defines the shape of documents: field names, types (String, Number, Date, Boolean, ObjectId, Array, Mixed), required constraints, default values, validators (min, max, enum, custom), and metadata. You compile a Schema into a Model with mongoose.model('Name', schema), and the Model is what you use to query the database.",
    "Mongoose middleware (hooks) run before or after certain operations. The most common is pre('save') — it fires before a document is saved. This is where you hash passwords: check isModified('password'), then hash with bcrypt before saving. Virtuals are properties defined on a schema that are NOT stored in MongoDB — they're computed on the fly. For example, a 'fullName' virtual derived from firstName + lastName. The .lean() method makes queries return plain JavaScript objects instead of full Mongoose Documents, which is 2-10x faster for read-only data.",
    "Mongoose handles database relationships by storing arrays of ObjectId references in schemas and using populate() to resolve them into full documents. For example, a User model with 'posts: [{ type: ObjectId, ref: 'Post' }]' — calling User.findById(id).populate('posts') will replace each ObjectId with the actual Post document. You can use { timestamps: true } in schema options to automatically add and manage createdAt and updatedAt fields. Query chaining (where, sort, limit, skip, select) gives you fine-grained control over what data is returned.",
  ],
  keyConcepts: [
    "Schema: blueprint for documents — types, required, default, validators, enum",
    "Model: compiled from schema with mongoose.model('Name', schema)",
    "CRUD: create, findById, findOne, findByIdAndUpdate, findByIdAndDelete",
    "Schema types: String, Number, Date, Boolean, ObjectId (ref), Mixed, Array",
    "pre('save') hook: runs before save — perfect for hashing passwords",
    "isModified('field'): check if a field changed before doing extra work in hooks",
    "Virtuals: computed properties (e.g., fullName = firstName + lastName) not stored in DB",
    "populate(): resolves ObjectId references into full documents (like JOIN)",
    ".lean(): returns plain JS objects instead of Mongoose Documents — faster for reads",
    "{ timestamps: true }: auto-adds and manages createdAt and updatedAt fields",
    "Database relations: One-to-One, One-to-Many (array of ObjectIds), Many-to-Many",
    "Query chaining: .where().sort().limit().skip().select() for fine-grained queries",
  ],
  codeExample: {
    language: "javascript",
    title: "Mongoose Schema with Hooks, Virtuals, and Population",
    code: `const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// ── User Schema ───────────────────────────────────
const userSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  role:      { type: String, enum: ['student', 'admin'], default: 'student' },
  posts:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true })  // auto-adds createdAt and updatedAt

// Virtual: fullName (not stored in DB)
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`
})

// Pre-save hook: hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()  // only hash if changed
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method: compare password during login
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

const User = mongoose.model('User', userSchema)

// ── Post Schema ───────────────────────────────────
const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: String,
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags:    [String],
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

// ── Usage ─────────────────────────────────────────

// Create user (password auto-hashed via pre-save hook)
const user = await User.create({
  email: 'ali@devonix.io',
  password: 'mypassword',
  firstName: 'Ali',
  lastName: 'Khan',
})
console.log(user.fullName)  // "Ali Khan" (virtual)

// Populate: replace ObjectId references with full documents
const userWithPosts = await User
  .findById(user._id)
  .populate('posts', 'title createdAt')  // only select title and createdAt from Post
  .lean()  // return plain JS object — faster for read-only`,
  },
}
