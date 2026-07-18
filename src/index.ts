// At the TOP of src/index.ts - Fixed pathing to use the new src/types folder
import type { User, Course, Submission, ApiResponse, UserUpdate, StringOrNumber } from "./types/index";
import { SubmissionStatus, Role } from "./types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====

const projectName: string = "itelect4-project-gt1";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====

let anything: any = "hello";
anything = 42;
anything = true;

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student", // Realigned to match literal strings inside your types file
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

function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}
console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ==========================================
// ===== SESSION 2 TEST CODE (GT1 PART 2) =====
// ==========================================

// ===== GENERIC FUNCTION =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const usersList: User[] = [student];
const firstUser = getFirst<User>(usersList);
console.log(`First User Name: ${firstUser?.name}`);

// Testing the Generic Interface[cite: 1]
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};
console.log(`API Response Status: ${userResponse.success}`);

// Testing Utility Types[cite: 1]
const profileUpdate: UserUpdate = { name: "Juan D. Cruz" };

// ===== Testing Enums =====
let currentStatus: SubmissionStatus = SubmissionStatus.Pending;
console.log(`Submission Status Index: ${currentStatus}`);

currentStatus = SubmissionStatus.Graded; 
console.log(`Is it graded? ${currentStatus === SubmissionStatus.Graded}`);

// Corrected from UserRole to Role to perfectly match your src/types/index.ts exports[cite: 1]
const myRole: Role = Role.Student;
console.log(`My Role: ${myRole}`);