// At the TOP of src/index.ts
import type { User, Course, Submission } from "../types/sample";

// ===== PRIMITIVE TYPE ANNOTATIONS =====

// Variables with explicit types
const projectName: string = "itelect4-project-gt1";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

// void: function that does NOT return a value
function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====

// any -- disables TypeScript type checking
// [!] Avoid using this; it defeats the purpose of TypeScript
let anything: any = "hello";
anything = 42; // No error
anything = true; // No error

// unknown -- the safer version of any
// You MUST check the type before using it
let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // OK -- TypeScript knows it's a string here
}

// never -- a function that NEVER returns
// Used when a function always throws an error or loops forever
function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};
const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};
console.log(student);
console.log(course);

// ===== TYPE NARROWING =====

import type { StringOrNumber } from "../types/sample";

// Narrowing with typeof
// Without the if-check, TypeScript would error:
// Property 'toUpperCase' does not exist on type 'number'
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // TypeScript knows: input is string here
  }
  return input.toFixed(2); // TypeScript knows: input is number here
}

// Narrowing with instanceof
// Used with class instances like Date, Error, etc.
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // TypeScript knows: it's a Date
  }
  return value; // TypeScript knows: it's a string
}
console.log(processInput("hello")); // HELLO
console.log(processInput(3.14159)); // 3.14
console.log(formatDate(new Date())); // e.g. 7/4/2026

// ==========================================
// ===== SESSION 2 TEST CODE (GT1 PART 2) =====
// ==========================================

import { 
  ApiResponse, 
  UserUpdate, 
  NewSubmissionPayload, 
  SubmissionStatus, 
  UserRole 
} from "../types/index";

// ===== GENERIC FUNCTION =====
// A function that extracts the first item from any array type safely[cite: 1]
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Testing the generic function[cite: 1]
const usersList: User[] = [student];
const firstUser = getFirst<User>(usersList);
console.log(`First User Name: ${firstUser?.name}`); // Juan dela Cruz

// Testing the Generic Interface[cite: 1]
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};
console.log(`API Response Status: ${userResponse.success}`);

// Testing Utility Types[cite: 1]
const profileUpdate: UserUpdate = { name: "Juan D. Cruz" }; // Only updating name[cite: 1]
const draftSubmission: NewSubmissionPayload = {
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/user/repo",
  submittedAt: new Date(),
};

// ===== Testing Enums =====
let currentStatus: SubmissionStatus = SubmissionStatus.Pending;
console.log(`Submission Status Index: ${currentStatus}`); // 0

// Reassign it so TypeScript knows the value can change!
currentStatus = SubmissionStatus.Graded; 
console.log(`Is it graded? ${currentStatus === SubmissionStatus.Graded}`); // Now this will be true!

const myRole: UserRole = UserRole.Student;
console.log(`My Role: ${myRole}`); // "student"