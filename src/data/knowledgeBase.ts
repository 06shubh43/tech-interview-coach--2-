import {
  SubjectId,
  SubjectMeta,
  StructuredCoachResponse,
  InterviewDifficulty,
  InterviewTurn,
  InterviewEvaluation,
  QuizDifficulty,
  QuizQuestion,
} from '../types';

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'DSA',
    label: 'Data Structures & Algorithms',
    shortLabel: 'DSA',
    category: 'Core CS',
    description: 'Arrays, linked lists, trees, graphs, sorting, binary search, and dynamic programming.',
    sampleQuestions: [
      'What is binary search?',
      'What is an array?',
      'Explain Hash Table collision resolution techniques',
      'Difference between BFS and DFS in graphs',
    ],
    codingQuestions: [
      'Write a Java program to reverse an array.',
      'Write a Python function to detect a cycle in a linked list.',
      'Implement Binary Search in C++.',
    ],
  },
  {
    id: 'Java',
    label: 'Java Programming',
    shortLabel: 'Java',
    category: 'Languages',
    description: 'JVM internals, collections framework, multithreading, streams, and memory management.',
    sampleQuestions: [
      'What is inheritance in Java?',
      'Difference between JDK, JRE, and JVM',
      'Explain HashMap internal working in Java',
      'What is the difference between Abstract Class and Interface in Java?',
    ],
    codingQuestions: [
      'Write a Java program to reverse an array.',
      'Write a Java program to check if a string is a palindrome.',
      'Write a Java program to find the first non-repeating character in a string.',
    ],
  },
  {
    id: 'Python',
    label: 'Python Programming',
    shortLabel: 'Python',
    category: 'Languages',
    description: 'Data structures, decorators, generators, GIL, list comprehensions, and memory model.',
    sampleQuestions: [
      'Explain Python list vs tuple',
      'What are decorators and generators in Python?',
      'What is the Global Interpreter Lock (GIL) in Python?',
      'Difference between deep copy and shallow copy in Python',
    ],
    codingQuestions: [
      'Write a Python program to find two numbers that add up to a target.',
      'Write a Python function to flatten a nested list.',
      'Write a Python program to count word frequencies in a string.',
    ],
  },
  {
    id: 'C/C++',
    label: 'C / C++ Programming',
    shortLabel: 'C/C++',
    category: 'Languages',
    description: 'Pointers, memory allocation, RAII, STL containers, virtual functions, and smart pointers.',
    sampleQuestions: [
      'What are virtual functions and vtable in C++?',
      'Difference between malloc/free and new/delete in C/C++',
      'Explain smart pointers (unique_ptr, shared_ptr, weak_ptr) in C++',
      'What is a dangling pointer and how do you avoid it?',
    ],
    codingQuestions: [
      'Write a C++ program to reverse a linked list.',
      'Write a C program to swap two numbers using pointers.',
      'Write a C++ program to implement a stack using arrays.',
    ],
  },
  {
    id: 'DBMS',
    label: 'Database Management Systems',
    shortLabel: 'DBMS',
    category: 'Core CS',
    description: 'Normalization, ACID properties, B+ tree indexing, concurrency control, and transactions.',
    sampleQuestions: [
      'What is normalization in DBMS?',
      'Explain ACID properties in database transactions',
      'How does B+ Tree indexing speed up database queries?',
      'What are deadlock handling strategies in DBMS?',
    ],
    codingQuestions: [
      'Write a SQL query to find the second highest salary.',
      'Write a SQL transaction example demonstrating rollback on error.',
    ],
  },
  {
    id: 'SQL',
    label: 'SQL & Query Optimization',
    shortLabel: 'SQL',
    category: 'Core CS',
    description: 'Joins, window functions, CTEs, aggregations, subqueries, and execution plan tuning.',
    sampleQuestions: [
      'Difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN',
      'What is the difference between WHERE and HAVING clauses in SQL?',
      'Explain Window Functions (ROW_NUMBER, RANK, DENSE_RANK) in SQL',
      'Difference between DELETE, TRUNCATE, and DROP in SQL',
    ],
    codingQuestions: [
      'Write a SQL query to find duplicate emails in a Users table.',
      'Write a SQL query to get the top 3 earners in each department.',
    ],
  },
  {
    id: 'Computer Networks',
    label: 'Computer Networks',
    shortLabel: 'Computer Networks',
    category: 'Core CS',
    description: 'OSI & TCP/IP models, TCP vs UDP, HTTP/HTTPS, DNS resolution, TLS handshake, and routing.',
    sampleQuestions: [
      'Explain TCP vs UDP',
      'What happens step-by-step when you type a URL into a browser?',
      'Explain the 7 layers of the OSI Model',
      'How does the TCP 3-way handshake work?',
    ],
    codingQuestions: [
      'Write a Python script to resolve a hostname and check an open TCP port.',
    ],
  },
  {
    id: 'Operating Systems',
    label: 'Operating Systems',
    shortLabel: 'Operating Systems',
    category: 'Core CS',
    description: 'Processes vs threads, CPU scheduling, virtual memory, paging, semaphores, and deadlocks.',
    sampleQuestions: [
      'What is the difference between a Process and a Thread?',
      'What are the four necessary conditions for a Deadlock?',
      'Explain Virtual Memory and Demand Paging in Operating Systems',
      'Compare Preemptive vs Non-Preemptive CPU scheduling',
    ],
    codingQuestions: [
      'Write a producer-consumer synchronization example in Java or Python.',
    ],
  },
  {
    id: 'OOP',
    label: 'Object-Oriented Programming',
    shortLabel: 'OOP',
    category: 'Core CS',
    description: 'Encapsulation, abstraction, inheritance, polymorphism, SOLID principles, and design patterns.',
    sampleQuestions: [
      'What is OOP?',
      'Difference between Compile-time and Runtime Polymorphism',
      'Explain the SOLID principles in Object-Oriented Design',
      'Composition over Inheritance: why and when should you prefer it?',
    ],
    codingQuestions: [
      'Write a Java program demonstrating Method Overloading and Method Overriding.',
      'Implement a thread-safe Singleton pattern in Java or Python.',
    ],
  },
  {
    id: 'Web Development',
    label: 'Web Development',
    shortLabel: 'Web Development',
    category: 'Modern Tech',
    description: 'REST APIs, authentication (JWT/OAuth), browser rendering, React architecture, and caching.',
    sampleQuestions: [
      'Explain RESTful API principles and HTTP status codes',
      'Difference between Authentication and Authorization (JWT vs Session)',
      'How does the JavaScript Event Loop work?',
      'What is CORS and how do browsers enforce it?',
    ],
    codingQuestions: [
      'Write a debounce function in JavaScript / TypeScript.',
      'Write an Express middleware to validate a Bearer token.',
    ],
  },
  {
    id: 'AI/ML',
    label: 'AI & Machine Learning',
    shortLabel: 'AI/ML',
    category: 'Modern Tech',
    description: 'Supervised vs unsupervised learning, bias-variance tradeoff, neural networks, and transformers.',
    sampleQuestions: [
      'Explain Overfitting vs Underfitting and how to prevent them',
      'What is the Bias-Variance Tradeoff in Machine Learning?',
      'Difference between Precision, Recall, and F1-Score',
      'How does the Self-Attention mechanism work in Transformers?',
    ],
    codingQuestions: [
      'Write a Python function to compute Cosine Similarity between two vectors.',
      'Write a Python implementation of Simple Linear Regression using Gradient Descent.',
    ],
  },
  {
    id: 'Cloud',
    label: 'Cloud Computing & DevOps',
    shortLabel: 'Cloud',
    category: 'Modern Tech',
    description: 'IaaS/PaaS/SaaS, Docker containers, Kubernetes orchestration, load balancing, and CI/CD.',
    sampleQuestions: [
      'Difference between Horizontal Scaling and Vertical Scaling',
      'Compare Docker Containers vs Virtual Machines',
      'Explain IaaS, PaaS, and SaaS with real-world examples',
      'How does a Load Balancer distribute traffic across servers?',
    ],
    codingQuestions: [
      'Write a multi-stage Dockerfile for a Node.js or Python service.',
    ],
  },
  {
    id: 'Software Engineering',
    label: 'Software Engineering & System Design',
    shortLabel: 'Software Engineering',
    category: 'Modern Tech',
    description: 'SDLC, Agile/Scrum, microservices vs monoliths, CAP theorem, caching strategies, and testing.',
    sampleQuestions: [
      'Explain the CAP Theorem in distributed systems',
      'Compare Microservices Architecture vs Monolithic Architecture',
      'What is the difference between Unit Testing, Integration Testing, and E2E Testing?',
      'Explain Cache Eviction Policies (LRU, LFU, FIFO)',
    ],
    codingQuestions: [
      'Implement an LRU (Least Recently Used) Cache in Python or Java.',
    ],
  },
];

export const FEATURED_STARTER_QUESTIONS = [
  { text: 'What is OOP?', subject: 'OOP' as SubjectId },
  { text: 'What is normalization in DBMS?', subject: 'DBMS' as SubjectId },
  { text: 'Explain TCP vs UDP', subject: 'Computer Networks' as SubjectId },
  { text: 'What is binary search?', subject: 'DSA' as SubjectId },
  { text: 'What is inheritance in Java?', subject: 'Java' as SubjectId },
  { text: 'Explain Python list vs tuple', subject: 'Python' as SubjectId },
  { text: 'What is an array?', subject: 'DSA' as SubjectId },
  { text: 'Write a Java program to reverse an array.', subject: 'Java' as SubjectId },
];

export const PREBUILT_TUTOR_ANSWERS: Record<string, StructuredCoachResponse> = {
  'what is oop?': {
    type: 'concept',
    title: 'Object-Oriented Programming (OOP)',
    subject: 'OOP',
    definition:
      'Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around objects—self-contained entities that bundle data (attributes/fields) and behavior (methods/functions) together—rather than pure functions and procedural logic.',
    simpleExplanation:
      'Think of OOP like designing a car from a blueprint. A "Class" is the engineering blueprint that defines what every car has (color, speed, fuel level) and what it can do (accelerate, brake). An "Object" is an actual physical car built from that blueprint. OOP relies on four core pillars: Encapsulation (hiding internal state behind clean methods), Abstraction (exposing only essential operations), Inheritance (reusing properties from a parent class), and Polymorphism (allowing one interface to work with different underlying data types).',
    example:
      'In a banking application, a BankAccount class encapsulates a private balance field so external code cannot arbitrarily set balance = -10000. Instead, callers invoke deposit(amount) and withdraw(amount), while SavingsAccount and CheckingAccount inherit from BankAccount and override calculateInterest() polymorphically.',
    exampleCode: {
      language: 'java',
      code: `public class BankAccount {
    private double balance; // Encapsulated state

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) this.balance += amount;
    }

    public double getBalance() {
        return this.balance;
    }
}`,
    },
    interviewAnswer:
      '"Object-Oriented Programming is a paradigm centered on modeling real-world entities as objects that encapsulate both state and behavior. It is built on four pillars: Encapsulation for data hiding and invariant protection, Abstraction for hiding implementation complexity, Inheritance for hierarchical code reuse, and Polymorphism for dynamic behavior switching through shared interfaces. Together, these principles make large codebases modular, extensible, and easier to maintain."',
    followUpQuestions: [
      'Difference between Compile-time and Runtime Polymorphism',
      'What is inheritance in Java?',
      'Explain the SOLID principles in Object-Oriented Design',
    ],
  },

  'what is normalization in dbms?': {
    type: 'concept',
    title: 'Database Normalization in DBMS',
    subject: 'DBMS',
    definition:
      'Normalization is the systematic process of organizing columns and tables in a relational database to minimize data redundancy and eliminate insertion, update, and deletion anomalies.',
    simpleExplanation:
      'Imagine storing student information and department details in one giant spreadsheet. If 500 students belong to the "Computer Science" department, the department head\'s name and office number are repeated 500 times. If the office changes, you have to update 500 rows (Update Anomaly), and if the last student graduates, you lose the department record entirely (Deletion Anomaly). Normalization splits large tables into smaller, well-defined tables linked by Foreign Keys through progressive stages: 1NF (atomic values), 2NF (no partial dependency on composite keys), 3NF (no transitive dependency), and BCNF.',
    example:
      'Unnormalized row: [StudentID: 101, Name: "Asha", DeptID: "CS01", DeptName: "Computer Science", HOD: "Dr. Rao"]. By normalizing into 3NF, we split this into a Students table (StudentID, Name, DeptID) and a Departments table (DeptID, DeptName, HOD). Now updating Dr. Rao\'s name requires modifying only a single row in Departments.',
    exampleCode: {
      language: 'sql',
      code: `-- Normalized 3NF Schema
CREATE TABLE Departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100) NOT NULL
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    dept_id VARCHAR(10) REFERENCES Departments(dept_id)
);`,
    },
    interviewAnswer:
      '"Normalization is a relational schema design technique used to reduce data redundancy and prevent data anomalies—specifically insertion, update, and deletion anomalies. We achieve it by decomposing tables based on functional dependencies through normal forms: 1NF ensures atomic attributes, 2NF removes partial dependencies on composite primary keys, 3NF eliminates transitive dependencies, and BCNF ensures every determinant is a candidate key."',
    followUpQuestions: [
      'When is Denormalization preferred over Normalization?',
      'Explain ACID properties in database transactions',
      'Difference between Primary Key, Unique Key, and Foreign Key',
    ],
  },

  'explain tcp vs udp': {
    type: 'concept',
    title: 'TCP vs UDP (Transport Layer Protocols)',
    subject: 'Computer Networks',
    definition:
      'TCP (Transmission Control Protocol) is a connection-oriented, reliable transport protocol that guarantees ordered, error-checked delivery of data packets, whereas UDP (User Datagram Protocol) is a connectionless, lightweight transport protocol that sends datagrams with minimal overhead and no delivery guarantees.',
    simpleExplanation:
      'Think of TCP like sending a tracked, signature-required courier package: before sending data, both sides establish a connection (3-way handshake: SYN, SYN-ACK, ACK), every packet is numbered, lost packets are retransmitted, and congestion is regulated. Think of UDP like shouting announcements over a live radio broadcast: data is sent immediately without establishing a session or waiting for acknowledgments. If a frame drops during a live video call or multiplayer game, waiting to retransmit old data is worse than moving on to the next frame.',
    example:
      'TCP is used where every byte must arrive intact: HTTPS web browsing (port 443), SSH (port 22), email (SMTP), and file transfers. UDP is used where low latency and speed matter more than occasional packet loss: DNS lookups (port 53), live video streaming, VoIP calls (WebRTC), and online gaming.',
    exampleCode: {
      language: 'text',
      code: `Feature            | TCP (Transmission Control) | UDP (User Datagram)
-------------------|----------------------------|-------------------------
Connection         | Connection-oriented        | Connectionless
Reliability        | Guaranteed (ACK + Retries) | Best-effort (No ACK)
Ordering           | Strictly ordered (Seq #)   | No ordering guarantee
Header Size        | 20–60 bytes                | 8 bytes (Fixed)
Flow/Congestion    | Yes (Sliding Window)       | No
Typical Use Cases  | HTTP/HTTPS, SSH, FTP, SQL  | DNS, VoIP, Gaming, Live Video`,
    },
    interviewAnswer:
      '"TCP and UDP are Layer 4 transport protocols with opposite trade-offs between reliability and latency. TCP is connection-oriented—using a 3-way handshake, sequence numbers, acknowledgments, and sliding-window flow control to guarantee ordered, lossless delivery, making it ideal for web traffic and databases. UDP is connectionless with an 8-byte header and no retransmission delays or head-of-line blocking, making it the preferred choice for real-time audio/video streaming, gaming, and DNS queries."',
    followUpQuestions: [
      'How does the TCP 3-way handshake work?',
      'What happens step-by-step when you type a URL into a browser?',
      'Explain the 7 layers of the OSI Model',
    ],
  },

  'what is binary search?': {
    type: 'concept',
    title: 'Binary Search Algorithm',
    subject: 'DSA',
    definition:
      'Binary Search is an efficient divide-and-conquer search algorithm that finds the position of a target value within a sorted array by repeatedly halving the search interval in O(log n) time.',
    simpleExplanation:
      'Imagine looking up a word in a physical dictionary or guessing a number between 1 and 100. Instead of checking page 1, page 2, page 3 sequentially (Linear Search), you open the book right in the middle. If your target word comes alphabetically after the middle page, you immediately discard the entire left half of the book and repeat the process on the right half. Because you cut the search space in half at every step, searching 1,000,000 sorted elements takes at most 20 comparisons!',
    example:
      'Given sorted array nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] and target = 23:\n1. low = 0, high = 9 → mid = 4 (value 16). Since 23 > 16, move low = mid + 1 = 5.\n2. low = 5, high = 9 → mid = 7 (value 56). Since 23 < 56, move high = mid - 1 = 6.\n3. low = 5, high = 6 → mid = 5 (value 23). Match found at index 5!',
    exampleCode: {
      language: 'java',
      code: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        // Prevents integer overflow compared to (low + high) / 2
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Target not found
}`,
    },
    interviewAnswer:
      '"Binary Search is a divide-and-conquer algorithm that locates a target element in a sorted collection in O(log n) time complexity and O(1) iterative space complexity. It maintains two pointers, low and high, inspects the middle element mid = low + (high - low) / 2, and eliminates half of the remaining search space on each comparison until the element is found or the pointers cross."',
    followUpQuestions: [
      'Why do we write mid = low + (high - low) / 2 instead of (low + high) / 2?',
      'How do you find the first and last occurrence of a number in a sorted array?',
      'How do you search in a rotated sorted array?',
    ],
  },

  'what is inheritance in java?': {
    type: 'concept',
    title: 'Inheritance in Java',
    subject: 'Java',
    definition:
      'Inheritance in Java is an Object-Oriented mechanism where a child class (subclass) acquires the fields and methods of a parent class (superclass) using the extends keyword, establishing an IS-A relationship.',
    simpleExplanation:
      'Inheritance allows you to define common attributes and behaviors once in a base class and reuse or specialize them in derived classes without duplicating code. In Java, a class can extend only one superclass (Single, Multilevel, or Hierarchical inheritance) to avoid the ambiguity of the "Diamond Problem", though a class can implement multiple interfaces.',
    example:
      'A base Employee class defines common properties like id, name, and baseSalary. A Developer subclass extends Employee, automatically inheriting those members while adding specialized fields like programmingLanguage and overriding calculateBonus().',
    exampleCode: {
      language: 'java',
      code: `class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double getAnnualCompensation() {
        return baseSalary * 12;
    }
}

class Developer extends Employee {
    private double stockBonus;

    public Developer(String name, double baseSalary, double stockBonus) {
        super(name, baseSalary); // Calls parent constructor
        this.stockBonus = stockBonus;
    }

    @Override
    public double getAnnualCompensation() {
        return super.getAnnualCompensation() + stockBonus;
    }
}`,
    },
    interviewAnswer:
      '"Inheritance in Java is a core OOP pillar that enables a subclass to inherit non-private fields and methods from a superclass via the extends keyword, representing an IS-A relationship. It promotes code reusability and enables runtime polymorphism through method overriding. Note that Java does not support multiple class inheritance to prevent state and method-resolution ambiguity, instead using interfaces to achieve multiple type inheritance."',
    followUpQuestions: [
      'Why does Java not support multiple inheritance with classes?',
      'What is the difference between Abstract Class and Interface in Java?',
      'Composition over Inheritance: why and when should you prefer it?',
    ],
  },

  'explain python list vs tuple': {
    type: 'concept',
    title: 'Python List vs Tuple',
    subject: 'Python',
    definition:
      'In Python, both list and tuple are ordered, indexable collections that can store heterogeneous items, but a list is mutable (can be modified after creation) whereas a tuple is immutable (cannot be modified in-place once created).',
    simpleExplanation:
      'Because lists can grow or shrink dynamically (via append(), pop(), sort()), Python allocates extra over-provisioned memory for them. Tuples have a fixed size and fixed contents, so Python allocates a single compact block of memory, making tuples faster to instantiate and iterate over. Crucially, because tuples are immutable (when containing hashable elements), they can be used as dictionary keys or elements inside a set, whereas lists cannot.',
    example:
      'Use a list when storing a dynamic queue of active user tasks that changes over time: tasks = ["login", "fetch_data"]. Use a tuple when representing fixed coordinates or database records that should never be mutated accidentally: coordinates = (37.7749, -122.4194).',
    exampleCode: {
      language: 'python',
      code: `# Mutable List []
active_servers = ["us-east-1", "eu-west-1"]
active_servers.append("ap-south-1")  # Valid: modifies in-place

# Immutable Tuple ()
geo_point = (37.7749, -122.4194)
# geo_point[0] = 40.7128  # Raises TypeError: 'tuple' object does not support item assignment

# Tuples can be used as dict keys (lists cannot!)
location_cache = {geo_point: "San Francisco, CA"}`,
    },
    interviewAnswer:
      '"The primary difference between a Python list and a tuple is mutability: lists are mutable dynamic arrays defined with square brackets [], while tuples are immutable sequences defined with parentheses (). Because of immutability, tuples have a smaller memory footprint, faster iteration speed, protection against unintended mutation, and are hashable—allowing them to serve as dictionary keys or set elements."',
    followUpQuestions: [
      'Can a tuple contain a mutable list inside it, and is it still hashable?',
      'Difference between deep copy and shallow copy in Python',
      'What are decorators and generators in Python?',
    ],
  },

  'what is an array?': {
    type: 'concept',
    title: 'Array Data Structure',
    subject: 'DSA',
    definition:
      'An array is a linear data structure consisting of a collection of elements of the same data type stored in contiguous memory locations, accessible in O(1) constant time using zero-based numerical indices.',
    simpleExplanation:
      'Think of an array like a row of numbered lockers in a hallway where every locker is the exact same size and sits right next to the previous one. Because the computer knows the memory address of locker #0 (the base address) and the exact byte size of each locker, it can jump directly to locker #i using a simple formula: Address(i) = Base_Address + (i × Element_Size). That makes reading any element instantaneous (O(1)), though inserting or deleting in the middle requires shifting subsequent elements (O(n)).',
    example:
      'If an integer array scores = [88, 92, 79, 95, 100] starts at memory address 1000 and each 32-bit integer takes 4 bytes, accessing scores[3] immediately computes 1000 + (3 × 4) = address 1012 and reads 95 in a single CPU step.',
    exampleCode: {
      language: 'java',
      code: `int[] scores = {88, 92, 79, 95, 100};

// O(1) Random Access by index
int fourthScore = scores[3]; // 95

// O(n) Linear Traversal
int sum = 0;
for (int score : scores) {
    sum += score;
}`,
    },
    interviewAnswer:
      '"An array is a linear data structure that stores fixed-size elements of the same type in contiguous memory locations. Its contiguous layout provides O(1) random access via index arithmetic and excellent CPU cache locality. However, static arrays have a fixed capacity upon allocation, and inserting or deleting elements at arbitrary positions takes O(n) time due to element shifting."',
    followUpQuestions: [
      'Write a Java program to reverse an array.',
      'What is the difference between an Array and a Linked List?',
      'How does a Dynamic Array (like Java ArrayList or C++ std::vector) resize itself?',
    ],
  },

  'write a java program to reverse an array.': {
    type: 'coding',
    title: 'Reverse an Array in Java (In-Place Two-Pointer Approach)',
    subject: 'Java',
    language: 'Java',
    approach:
      'Use the Two-Pointer technique to reverse the array in-place without allocating a second array. Initialize one pointer (left) at the start of the array (index 0) and a second pointer (right) at the end of the array (index n - 1). Swap the elements at left and right, then increment left and decrement right until the two pointers meet or cross in the middle.',
    code: `import java.util.Arrays;

public class ReverseArray {
    public static void reverseInPlace(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return; // Edge case: null, empty, or single-element array
        }

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            // Swap elements at left and right pointers
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            // Move pointers toward the center
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        reverseInPlace(numbers);
        System.out.println("Reversed Array: " + Arrays.toString(numbers));
        // Output: Reversed Array: [50, 40, 30, 20, 10]
    }
}`,
    importantLines: [
      {
        lineRef: 'if (arr == null || arr.length <= 1) return;',
        explanation: 'Defensive guard clause that safely handles null references and arrays of length 0 or 1.',
      },
      {
        lineRef: 'int left = 0; int right = arr.length - 1;',
        explanation: 'Sets up the two boundary pointers at the first and last valid indices of the array.',
      },
      {
        lineRef: 'while (left < right)',
        explanation: 'Runs exactly n / 2 iterations; stops automatically when pointers meet at the middle element.',
      },
      {
        lineRef: 'int temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;',
        explanation: 'Classic three-step swap in O(1) memory without risking arithmetic overflow.',
      },
    ],
    timeComplexity: 'O(n) — Performs n/2 swaps, visiting each element once.',
    spaceComplexity: 'O(1) — Reverses the array in-place using only a single temporary variable.',
    interviewTip:
      'Always start by checking null/empty array edge cases, and mention to the interviewer why the in-place two-pointer swap (O(1) auxiliary space) is superior to creating a new array of size n (O(n) space). Also avoid XOR-swap tricks in production code as they hurt readability.',
    followUpQuestions: [
      'How do you rotate an array to the right by k steps in O(1) space?',
      'Write a Java program to check if a string is a palindrome.',
      'What is an array?',
    ],
  },
};

export function generateFallbackTutorResponse(
  prompt: string,
  activeSubject: SubjectId,
  preferredLanguage: 'Java' | 'Python' | 'C++' | 'C' = 'Java'
): StructuredCoachResponse {
  const normalized = prompt.trim().toLowerCase();

  // Check exact or close match in prebuilt library
  if (PREBUILT_TUTOR_ANSWERS[normalized]) {
    return PREBUILT_TUTOR_ANSWERS[normalized];
  }
  for (const [key, val] of Object.entries(PREBUILT_TUTOR_ANSWERS)) {
    if (normalized.includes(key.replace('?', '').replace('.', ''))) {
      return val;
    }
  }

  // Detect if it's a coding question
  const isCodingPrompt =
    /\b(write|implement|code|program|function|algorithm to|solve|leetcode|reverse|palindrome|two sum|lru cache|cycle|factorial|fibonacci)\b/i.test(
      prompt
    ) && /\b(java|python|c\+\+|c|sql|js|javascript|typescript|program|function|code|implement|write)\b/i.test(prompt);

  if (isCodingPrompt) {
    const lang = /\bpython\b/i.test(prompt)
      ? 'Python'
      : /\bc\+\+\b/i.test(prompt)
      ? 'C++'
      : /\bsql\b/i.test(prompt)
      ? 'SQL'
      : /\bjava\b/i.test(prompt)
      ? 'Java'
      : preferredLanguage;

    if (/palindrome/i.test(prompt)) {
      return {
        type: 'coding',
        title: `Check if a String is a Palindrome (${lang})`,
        subject: activeSubject,
        language: lang,
        approach:
          'Use two pointers starting at the beginning (left = 0) and end (right = n - 1) of the string. Compare characters moving inward. If any pair mismatches, return false immediately; if the pointers cross without mismatch, the string is a palindrome.',
        code:
          lang === 'Python'
            ? `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("racecar"))  # True
print(is_palindrome("interview"))  # False`
            : `public class PalindromeCheck {
    public static boolean isPalindrome(String s) {
        if (s == null) return false;
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar")); // true
    }
}`,
        importantLines: [
          {
            lineRef: 'int left = 0, right = s.length() - 1;',
            explanation: 'Initializes pointers at both ends to avoid allocating a reversed copy of the string.',
          },
          {
            lineRef: 'if (s.charAt(left) != s.charAt(right)) return false;',
            explanation: 'Short-circuits as soon as a mismatch is detected.',
          },
        ],
        timeComplexity: 'O(n) — Compares at most n / 2 character pairs.',
        spaceComplexity: 'O(1) — Uses constant extra memory instead of O(n) string reversal.',
        interviewTip:
          'Clarify with the interviewer whether comparison should be case-insensitive and whether non-alphanumeric characters (spaces, punctuation) should be ignored.',
        followUpQuestions: [
          'How do you find the longest palindromic substring in a string?',
          'Can we check if a singly linked list is a palindrome in O(1) space?',
        ],
      };
    }

    return {
      type: 'coding',
      title: `Technical Coding Solution: ${prompt.trim()}`,
      subject: activeSubject,
      language: lang,
      approach: `Break the problem into clear stages: validate input constraints and edge cases first, choose the optimal data structure for fast lookups or in-place traversal, and process elements in a single pass where possible to minimize time and auxiliary space complexity.`,
      code:
        lang === 'Python'
          ? `def solve_problem(nums: list[int], target: int) -> list[int]:
    """
    Optimal O(n) single-pass solution using a hash map for O(1) lookups.
    """
    seen: dict[int, int] = {}
    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return []

if __name__ == "__main__":
    print(solve_problem([2, 7, 11, 15], 9))  # Output: [0, 1]`
          : `import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class Solution {
    public static int[] solve(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return new int[]{};
        }
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] result = solve(new int[]{2, 7, 11, 15}, 9);
        System.out.println("Result indices: " + Arrays.toString(result));
    }
}`,
      importantLines: [
        {
          lineRef: 'Map<Integer, Integer> seen = new HashMap<>();',
          explanation: 'Stores previously visited values and their indices for O(1) average-time lookup.',
        },
        {
          lineRef: 'int complement = target - nums[i];',
          explanation: 'Computes the exact partner value needed to satisfy the condition at index i.',
        },
        {
          lineRef: 'if (seen.containsKey(complement))',
          explanation: 'Replaces an O(n) nested loop with an O(1) hash lookup, reducing overall runtime from O(n²) to O(n).',
        },
      ],
      timeComplexity: 'O(n) — Traverses the input collection once with O(1) average hash table operations.',
      spaceComplexity: 'O(n) — Stores at most n elements in the auxiliary lookup map.',
      interviewTip:
        'Start by stating the brute-force O(n²) approach in 15 seconds, then immediately explain how trading O(n) space with a Hash Map brings time complexity down to O(n).',
      followUpQuestions: [
        'How would your approach change if the input array is already sorted?',
        'What are the worst-case time complexity implications of hash collisions?',
      ],
    };
  }

  // Concept fallback
  const cleanTopic = prompt.replace(/^(what is|explain|describe|how does|compare)\s+/i, '').replace(/\?$/, '');
  return {
    type: 'concept',
    title: cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1),
    subject: activeSubject,
    definition: `${
      cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)
    } is a core concept in ${activeSubject} that defines how systems structure, process, and optimize operations with predictable correctness, scalability, and maintainability.`,
    simpleExplanation: `At a fundamental level, interviewers ask about ${cleanTopic} to verify that you understand both how it works under the hood and why engineers choose it over alternatives. Instead of memorizing a textbook line, focus on the problem it solves: reducing latency, preventing resource contention, or decoupling components so changes remain isolated.`,
    example: `In a production ${activeSubject} workflow, applying ${cleanTopic} ensures that as traffic or dataset size grows by 10x, system behavior remains deterministic and easy to debug.`,
    interviewAnswer: `"In ${activeSubject}, ${cleanTopic} is used to achieve modular design and predictable performance. It works by establishing clear invariants between state and execution, allowing engineers to optimize throughput while preventing common edge-case failures in production environments."`,
    followUpQuestions: [
      `What are the main trade-offs and limitations of ${cleanTopic}?`,
      `Can you show a practical code example of ${cleanTopic}?`,
      `How is ${cleanTopic} tested in senior technical interviews?`,
    ],
  };
}

export const INTERVIEW_QUESTION_BANK: Omit<InterviewTurn, 'id' | 'questionNumber' | 'userAnswer' | 'evaluation'>[] = [
  // DSA
  {
    subject: 'DSA',
    difficulty: 'Beginner',
    question: 'What is the difference between an Array and a Linked List, and when would you choose one over the other?',
    hint: 'Compare memory layout (contiguous vs non-contiguous), random access time O(1) vs O(n), and insertion/deletion costs.',
    expectedKeyPoints: ['contiguous memory', 'O(1) random access', 'O(n) insertion', 'pointers/nodes', 'dynamic size', 'cache locality'],
    idealAnswer:
      'An Array stores elements in contiguous memory locations, giving O(1) random access by index and strong CPU cache locality, but resizing or inserting/deleting in the middle takes O(n) time. A Linked List stores elements in non-contiguous nodes connected by pointers, requiring O(n) traversal for access but allowing O(1) insertion and deletion once the node reference is known. Choose arrays for frequent indexed reads and predictable sizes; choose linked lists when frequent insertions/deletions occur at the ends or middle.',
  },
  {
    subject: 'DSA',
    difficulty: 'Intermediate',
    question: 'How does a Hash Table work internally, and how are hash collisions resolved?',
    hint: 'Discuss the hash function, bucket array, modulo indexing, load factor, Separate Chaining, and Open Addressing.',
    expectedKeyPoints: ['hash function', 'buckets', 'collision', 'chaining', 'open addressing', 'load factor', 'O(1)'],
    idealAnswer:
      'A Hash Table maps keys to values by passing the key through a hash function to compute an integer hash code, which is mapped to an array bucket index (often via modulo or bitmasking). When two distinct keys map to the same bucket (a collision), it is resolved via Separate Chaining (storing a linked list or balanced tree at each bucket, as in Java 8+ HashMap) or Open Addressing (probing for the next free slot via linear probing, quadratic probing, or double hashing). Maintaining a load factor threshold (e.g. 0.75) and rehashing keeps average lookup, insertion, and deletion at O(1).',
  },
  {
    subject: 'DSA',
    difficulty: 'Advanced',
    question: 'Compare Dynamic Programming (Memoization vs Tabulation) and Greedy Algorithms. How do you recognize when DP is required?',
    hint: 'Mention Optimal Substructure, Overlapping Subproblems, top-down recursion with cache vs bottom-up state table.',
    expectedKeyPoints: ['optimal substructure', 'overlapping subproblems', 'memoization', 'tabulation', 'greedy choice', 'state transition'],
    idealAnswer:
      'Both Dynamic Programming and Greedy algorithms require Optimal Substructure, meaning an optimal solution to the problem contains optimal solutions to subproblems. However, Greedy algorithms make a locally optimal choice at each step and never reconsider past choices, whereas DP is needed when subproblems overlap and a locally greedy choice does not guarantee a global optimum. Memoization is top-down recursion with caching, while Tabulation builds solutions bottom-up iteratively in a table (often enabling space optimization).',
  },
  // Java
  {
    subject: 'Java',
    difficulty: 'Beginner',
    question: 'Explain the difference between == and .equals() in Java, and why overriding hashCode() is required when overriding equals().',
    hint: 'Think about reference equality in memory vs logical value equality, and how HashMap/HashSet locate keys.',
    expectedKeyPoints: ['reference equality', 'memory address', 'value equality', 'content', 'hashCode contract', 'HashMap'],
    idealAnswer:
      'In Java, the == operator compares memory references (checking if two variables point to the exact same object on the heap, or comparing primitive values), whereas .equals() compares the logical content of two objects. According to the Object contract, if two objects are equal according to .equals(), they MUST return the same hashCode(). Violating this breaks hash-based collections like HashMap and HashSet because two logically equal objects might land in different hash buckets.',
  },
  {
    subject: 'Java',
    difficulty: 'Intermediate',
    question: 'How does Java HashMap work internally, and what optimization was introduced in Java 8 for high-collision buckets?',
    hint: 'Mention Node<K,V>[] table, hashCode() perturbation, equals(), load factor 0.75, and treeification threshold of 8.',
    expectedKeyPoints: ['bucket array', 'hashCode', 'equals', 'load factor', '0.75', 'Red-Black Tree', 'O(log n)'],
    idealAnswer:
      'Java HashMap uses an array of Node<K,V> buckets (default capacity 16, load factor 0.75). On put(key, val), it computes key.hashCode(), XORs higher bits into lower bits to reduce collisions, and finds bucket index (n - 1) & hash. If the bucket is occupied, it traverses the chain using .equals() to update an existing key or append a new node. In Java 8+, when a single bucket reaches 8 nodes (TREEIFY_THRESHOLD) and total capacity is at least 64, the linked list converts into a balanced Red-Black Tree, improving worst-case lookup from O(n) to O(log n).',
  },
  {
    subject: 'Java',
    difficulty: 'Advanced',
    question: 'Explain the Java Memory Model (JMM), the volatile keyword, and how Happens-Before guarantees prevent visibility bugs in multithreading.',
    hint: 'Think about CPU core caches vs main memory, instruction reordering, and atomic vs volatile operations.',
    expectedKeyPoints: ['visibility', 'CPU cache', 'main memory', 'reordering', 'happens-before', 'atomicity'],
    idealAnswer:
      'The Java Memory Model defines how threads interact through memory and when writes by one thread become visible to another. Without synchronization, threads may read stale values cached in CPU registers/L1 caches or observe reordered instructions. Marking a field volatile guarantees visibility (reads/writes go directly to main memory) and establishes a Happens-Before relationship that prevents instruction reordering across the volatile access. However, volatile does not guarantee atomicity for compound actions like count++—which require synchronized blocks or AtomicInteger (CAS).',
  },
  // Python
  {
    subject: 'Python',
    difficulty: 'Beginner',
    question: 'What is the difference between a list and a tuple in Python, and when should you use each?',
    hint: 'Discuss mutability, memory footprint, hashability (dict keys), and semantic intent.',
    expectedKeyPoints: ['mutable', 'immutable', 'hashable', 'dictionary key', 'memory', 'performance'],
    idealAnswer:
      'Lists are mutable sequences declared with [], allowing in-place appends, removals, and updates, whereas tuples are immutable sequences declared with (). Because tuples are immutable, Python allocates exact memory without over-provisioning, making them more memory-efficient and faster to iterate. Additionally, tuples containing hashable elements are themselves hashable and can be used as dictionary keys or set members.',
  },
  {
    subject: 'Python',
    difficulty: 'Intermediate',
    question: 'What are Python Generators and the yield keyword, and how do they improve memory efficiency when processing large datasets?',
    hint: 'Contrast eager list evaluation in RAM with lazy iteration and state suspension.',
    expectedKeyPoints: ['lazy evaluation', 'yield', 'iterator', 'memory O(1)', 'state suspension', 'StopIteration'],
    idealAnswer:
      'A generator in Python is a function that uses the yield keyword to produce a sequence of values lazily one at a time instead of computing and storing all values in memory at once. When yield is executed, the function pauses and saves its local execution state, resuming from that exact point on the next next() call. This allows streaming multi-gigabyte log files or database cursors in O(1) auxiliary memory.',
  },
  {
    subject: 'Python',
    difficulty: 'Advanced',
    question: 'Explain the Global Interpreter Lock (GIL) in CPython. Why does it exist, and how do you achieve true parallelism in Python?',
    hint: 'Differentiate between I/O-bound workloads (threading/asyncio) and CPU-bound workloads (multiprocessing/C extensions).',
    expectedKeyPoints: ['mutex', 'reference counting', 'thread safety', 'CPU-bound', 'I/O-bound', 'multiprocessing'],
    idealAnswer:
      'The GIL is a mutex in CPython that allows only one native thread to execute Python bytecodes at a time. It exists because CPython uses reference counting for memory management, and a single global lock prevents race conditions on reference counts without the overhead of fine-grained locks on every object. For I/O-bound tasks, threading or asyncio works well because the GIL is released during network/disk I/O. For CPU-bound tasks, true multi-core parallelism is achieved via the multiprocessing module, Cython/NumPy C-extensions that release the GIL, or free-threaded Python builds.',
  },
  // C/C++
  {
    subject: 'C/C++',
    difficulty: 'Beginner',
    question: 'What is the difference between Pointers and References in C++?',
    hint: 'Consider nullability, reassignment, memory address storage, and syntax.',
    expectedKeyPoints: ['nullptr', 'reassignment', 'alias', 'dereference', 'initialization'],
    idealAnswer:
      'A pointer is a variable that holds the memory address of another variable; it can be reassigned to point to different objects, can be assigned nullptr, and requires explicit dereferencing with *. A reference is an alias for an existing object; it must be initialized when declared, cannot be null, and cannot be reseated to refer to a different object later.',
  },
  {
    subject: 'C/C++',
    difficulty: 'Intermediate',
    question: 'How do Virtual Functions work under the hood in C++ using vtable and vptr, and why should a base class destructor be virtual?',
    hint: 'Discuss dynamic dispatch at runtime and what happens when deleting a derived object through a base pointer.',
    expectedKeyPoints: ['vtable', 'vptr', 'dynamic dispatch', 'runtime polymorphism', 'memory leak', 'virtual destructor'],
    idealAnswer:
      'When a C++ class declares a virtual function, the compiler creates a Virtual Method Table (vtable) containing function pointers to the most-derived implementations, and adds a hidden vptr pointer to each object instance. Calls through a base pointer resolve the function address via the vptr at runtime. A base class destructor must be virtual so that deleting a derived object via a base class pointer invokes the derived destructor first; otherwise, undefined behavior and resource leaks occur.',
  },
  // DBMS & SQL
  {
    subject: 'DBMS',
    difficulty: 'Beginner',
    question: 'Explain the ACID properties of database transactions with a practical banking example.',
    hint: 'Break down Atomicity, Consistency, Isolation, and Durability during a bank transfer.',
    expectedKeyPoints: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'all or nothing', 'WAL', 'concurrency'],
    idealAnswer:
      'ACID guarantees reliable database transactions: Atomicity ensures all operations in a transaction succeed or none do ("all-or-nothing" via rollback). Consistency ensures the database transitions from one valid state to another preserving all constraints. Isolation ensures concurrent transactions do not interfere with each other using locking or MVCC isolation levels. Durability guarantees that once a transaction commits, its changes persist even after a power crash via Write-Ahead Logging (WAL).',
  },
  {
    subject: 'SQL',
    difficulty: 'Intermediate',
    question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() window functions in SQL?',
    hint: 'Describe how each function handles ties (duplicate values) in the ORDER BY clause.',
    expectedKeyPoints: ['window function', 'ties', 'gaps', 'unique sequential', 'PARTITION BY'],
    idealAnswer:
      'All three assign sequential integers across a window partition ordered by a column, but they differ on ties: ROW_NUMBER() assigns a strictly unique number (1, 2, 3, 4) breaking ties arbitrarily. RANK() assigns the same rank to ties and skips subsequent numbers (1, 2, 2, 4). DENSE_RANK() assigns the same rank to ties without skipping any rank numbers (1, 2, 2, 3), making it ideal for "N-th highest distinct salary" queries.',
  },
  // Computer Networks
  {
    subject: 'Computer Networks',
    difficulty: 'Beginner',
    question: 'Explain the differences between TCP and UDP and give real-world use cases for each.',
    hint: 'Cover connection setup, reliability, ordering, congestion control, and header overhead.',
    expectedKeyPoints: ['connection-oriented', '3-way handshake', 'connectionless', 'reliable', 'low latency', 'DNS', 'HTTP'],
    idealAnswer:
      'TCP is a connection-oriented protocol that uses a 3-way handshake, sequence numbers, ACKs, and retransmissions to guarantee reliable, ordered delivery—used for HTTP/HTTPS, SSH, and databases. UDP is a connectionless protocol with minimal 8-byte header overhead and no retransmission delays—used for latency-sensitive workloads like DNS lookups, VoIP, live streaming, and multiplayer gaming.',
  },
  // Operating Systems
  {
    subject: 'Operating Systems',
    difficulty: 'Intermediate',
    question: 'What are the difference between a Process and a Thread, and what resources do threads share within the same process?',
    hint: 'Compare address space isolation, context switch overhead, heap/code sharing vs independent stack/registers.',
    expectedKeyPoints: ['address space', 'isolated', 'shared heap', 'independent stack', 'registers', 'context switch'],
    idealAnswer:
      'A Process is an independent program in execution with its own isolated virtual address space, file descriptors, and OS resources. A Thread is a lightweight unit of CPU execution within a process. Threads within the same process share the code segment, data segment, heap memory, and open files, making inter-thread communication fast and context switching cheap, while each thread maintains its own private stack, program counter, and CPU registers.',
  },
  // OOP
  {
    subject: 'OOP',
    difficulty: 'Beginner',
    question: 'Explain the four pillars of Object-Oriented Programming with real-world software examples.',
    hint: 'Define Encapsulation, Abstraction, Inheritance, and Polymorphism clearly.',
    expectedKeyPoints: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism', 'data hiding', 'interface'],
    idealAnswer:
      'The four pillars of OOP are: 1) Encapsulation—bundling private fields with public methods to protect object invariants; 2) Abstraction—exposing simple high-level interfaces while hiding complex internal implementation details; 3) Inheritance—allowing a subclass to reuse and specialize behavior from a superclass; and 4) Polymorphism—allowing different classes to be treated uniformly through a shared interface or base class.',
  },
  // Web Development
  {
    subject: 'Web Development',
    difficulty: 'Intermediate',
    question: 'How does the JavaScript Event Loop work with the Call Stack, Microtask Queue, and Macrotask Queue?',
    hint: 'Compare synchronous execution, Promises (microtasks), and setTimeout/I/O callbacks (macrotasks).',
    expectedKeyPoints: ['single-threaded', 'call stack', 'microtask queue', 'macrotask', 'Promises', 'setTimeout'],
    idealAnswer:
      'JavaScript runs on a single-threaded Call Stack. Asynchronous operations are delegated to Web/Node APIs. When synchronous code finishes and the Call Stack is empty, the Event Loop first drains the entire Microtask Queue (Promise .then/catch/finally callbacks and queueMicrotask) to completion before picking a single task from the Macrotask Queue (setTimeout, setInterval, I/O events) and repeating the cycle.',
  },
  // AI/ML
  {
    subject: 'AI/ML',
    difficulty: 'Intermediate',
    question: 'Explain the Bias-Variance Tradeoff in Machine Learning and how you diagnose and fix Overfitting vs Underfitting.',
    hint: 'Connect high bias to underfitting, high variance to overfitting, and mention regularization, cross-validation, and data augmentation.',
    expectedKeyPoints: ['bias', 'variance', 'overfitting', 'underfitting', 'regularization', 'validation error'],
    idealAnswer:
      'Bias is error from overly simplistic assumptions (leading to Underfitting, where both training and validation errors are high). Variance is sensitivity to small fluctuations in the training set (leading to Overfitting, where training error is very low but validation error is high). We mitigate underfitting by increasing model capacity or adding features, and mitigate overfitting using L1/L2 regularization, dropout, early stopping, and more training data.',
  },
  // Cloud
  {
    subject: 'Cloud',
    difficulty: 'Intermediate',
    question: 'Compare Docker Containers and Virtual Machines (VMs). Why are containers faster to start and lighter on resources?',
    hint: 'Contrast host OS kernel sharing (namespaces & cgroups) vs hypervisor with full guest OS per VM.',
    expectedKeyPoints: ['host OS kernel', 'hypervisor', 'guest OS', 'namespaces', 'cgroups', 'lightweight', 'startup time'],
    idealAnswer:
      'Virtual Machines run on a hypervisor where each VM includes a full guest operating system kernel, virtualized hardware, and binaries, consuming gigabytes of RAM and taking seconds or minutes to boot. Docker Containers share the host OS kernel and isolate processes using Linux namespaces (visibility) and cgroups (resource limits), resulting in megabyte-sized images and millisecond startup times.',
  },
  // Software Engineering
  {
    subject: 'Software Engineering',
    difficulty: 'Intermediate',
    question: 'Explain the CAP Theorem in distributed systems. Why must a distributed database choose between CP and AP during a network partition?',
    hint: 'Define Consistency, Availability, and Partition Tolerance, and explain what happens when nodes cannot communicate.',
    expectedKeyPoints: ['Consistency', 'Availability', 'Partition Tolerance', 'network split', 'CP', 'AP'],
    idealAnswer:
      'The CAP Theorem states that a distributed data store can simultaneously guarantee at most two of three properties: Consistency (every read receives the most recent write), Availability (every non-failing node returns a non-error response), and Partition Tolerance (the system continues operating despite arbitrary network message loss between nodes). Because network partitions are inevitable in distributed systems, when a partition occurs you must choose between rejecting writes/reads to prevent stale data (CP) or serving potentially stale data to remain available (AP).',
  },
];

export function evaluateInterviewAnswerFallback(
  turn: Omit<InterviewTurn, 'userAnswer' | 'evaluation'>,
  userAnswer: string
): InterviewEvaluation {
  const normalizedUser = userAnswer.toLowerCase();
  const matchedPoints: string[] = [];
  const missedPoints: string[] = [];

  for (const point of turn.expectedKeyPoints) {
    const words = point.toLowerCase().split(/\s+/);
    const isMatched = words.some((w) => w.length > 2 && normalizedUser.includes(w));
    if (isMatched) {
      matchedPoints.push(`Covered key concept: "${point}"`);
    } else {
      missedPoints.push(`Include discussion of "${point}" for a complete technical explanation`);
    }
  }

  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;
  const ratio = turn.expectedKeyPoints.length > 0 ? matchedPoints.length / turn.expectedKeyPoints.length : 0.5;
  let rawScore = Math.round((ratio * 7 + Math.min(wordCount / 35, 1) * 3) * 10) / 10;
  rawScore = Math.max(3.5, Math.min(9.8, rawScore));

  if (matchedPoints.length === 0) {
    matchedPoints.push('Attempted to address the core question directly');
  }
  if (missedPoints.length === 0) {
    missedPoints.push('Consider adding a brief production trade-off or time/space complexity metric to stand out further');
  }

  const verdict: InterviewEvaluation['verdict'] =
    rawScore >= 8.0 ? 'Strong' : rawScore >= 6.0 ? 'Good' : 'Needs Improvement';

  return {
    score: rawScore,
    verdict,
    whatWasCorrect: matchedPoints,
    whatWasMissing: missedPoints,
    improvedAnswer: turn.idealAnswer,
  };
}

export const QUIZ_QUESTION_BANK: QuizQuestion[] = [
  // DSA
  {
    id: 'dsa-1',
    subject: 'DSA',
    difficulty: 'Easy',
    question: 'What is the worst-case time complexity of Binary Search on a sorted array of n elements?',
    options: {
      A: 'O(n)',
      B: 'O(log n)',
      C: 'O(n log n)',
      D: 'O(1)',
    },
    correctOption: 'B',
    explanation: 'Binary Search halves the search interval on every comparison, resulting in at most log₂(n) steps, or O(log n) worst-case time complexity.',
  },
  {
    id: 'dsa-2',
    subject: 'DSA',
    difficulty: 'Easy',
    question: 'Which data structure follows the LIFO (Last-In, First-Out) principle?',
    options: {
      A: 'Queue',
      B: 'Stack',
      C: 'Min-Heap',
      D: 'Hash Table',
    },
    correctOption: 'B',
    explanation: 'A Stack operates on a Last-In, First-Out (LIFO) basis where push() and pop() happen at the top of the stack, such as function call stacks.',
  },
  {
    id: 'dsa-3',
    subject: 'DSA',
    difficulty: 'Medium',
    question: 'Which traversal of a Binary Search Tree (BST) visits the nodes in non-decreasing sorted order?',
    options: {
      A: 'Pre-order Traversal',
      B: 'Post-order Traversal',
      C: 'In-order Traversal',
      D: 'Level-order Traversal',
    },
    correctOption: 'C',
    explanation: 'In-order traversal visits Left Subtree → Root → Right Subtree. Because all left descendants are smaller and right descendants are larger in a BST, it outputs elements in sorted order.',
  },
  {
    id: 'dsa-4',
    subject: 'DSA',
    difficulty: 'Medium',
    question: 'What is the average and worst-case time complexity of QuickSort?',
    options: {
      A: 'Average: O(n log n), Worst: O(n²)',
      B: 'Average: O(n log n), Worst: O(n log n)',
      C: 'Average: O(n), Worst: O(n log n)',
      D: 'Average: O(n²), Worst: O(n²)',
    },
    correctOption: 'A',
    explanation: 'QuickSort achieves O(n log n) on average when pivots partition the array evenly, but degrades to O(n²) if the smallest or largest element is repeatedly chosen as the pivot.',
  },
  {
    id: 'dsa-5',
    subject: 'DSA',
    difficulty: 'Hard',
    question: 'Which algorithm finds the shortest paths from a single source in a weighted graph that may contain negative edge weights (but no negative cycles)?',
    options: {
      A: 'Dijkstra’s Algorithm',
      B: 'Bellman-Ford Algorithm',
      C: 'Kruskal’s Algorithm',
      D: 'Prim’s Algorithm',
    },
    correctOption: 'B',
    explanation: 'Bellman-Ford relaxes all edges V - 1 times in O(V × E) time, properly handling negative edge weights and detecting negative-weight cycles, whereas greedy Dijkstra fails with negative edges.',
  },
  // Java
  {
    id: 'java-1',
    subject: 'Java',
    difficulty: 'Easy',
    question: 'Which keyword in Java is used to prevent a method from being overridden in a subclass?',
    options: {
      A: 'static',
      B: 'final',
      C: 'abstract',
      D: 'volatile',
    },
    correctOption: 'B',
    explanation: 'Declaring a method as final prevents any subclass from overriding it, declaration on a class prevents inheritance, and on a variable prevents reassignment.',
  },
  {
    id: 'java-2',
    subject: 'Java',
    difficulty: 'Medium',
    question: 'In Java 8+, what happens in a HashMap when a single bucket chain exceeds 8 nodes (and table capacity >= 64)?',
    options: {
      A: 'It throws an OutOfMemoryError',
      B: 'The bucket converts from a Linked List to a balanced Red-Black Tree',
      C: 'It drops the oldest entry using LRU eviction',
      D: 'It switches to linear probing across adjacent buckets',
    },
    correctOption: 'B',
    explanation: 'Java 8 introduced treeification: high-collision buckets convert from O(n) linked lists into O(log n) Red-Black Trees once TREEIFY_THRESHOLD (8) is reached.',
  },
  {
    id: 'java-3',
    subject: 'Java',
    difficulty: 'Hard',
    question: 'Where are String literals stored in the JVM memory architecture in modern Java (Java 8+)?',
    options: {
      A: 'Thread Call Stack',
      B: 'String Constant Pool inside the Heap space',
      C: 'Native OS Kernel Stack',
      D: 'CPU L1 Register Cache',
    },
    correctOption: 'B',
    explanation: 'Starting in Java 7/8, the String Constant Pool was moved out of PermGen into the main Heap space so interned strings can be garbage collected when unreferenced.',
  },
  // Python
  {
    id: 'py-1',
    subject: 'Python',
    difficulty: 'Easy',
    question: 'Which of the following data types in Python is immutable and can be used as a dictionary key?',
    options: {
      A: 'list',
      B: 'set',
      C: 'tuple (of immutable elements)',
      D: 'dict',
    },
    correctOption: 'C',
    explanation: 'Dictionary keys in Python must be hashable (immutable). A tuple containing immutable elements is immutable and hashable, whereas lists, sets, and dicts are mutable.',
  },
  {
    id: 'py-2',
    subject: 'Python',
    difficulty: 'Medium',
    question: 'What is the output of bool([]) and bool([0]) in Python?',
    options: {
      A: 'False and True',
      B: 'False and False',
      C: 'True and True',
      D: 'True and False',
    },
    correctOption: 'A',
    explanation: 'An empty container [] is falsy (False), whereas [0] is a non-empty list of length 1, so bool([0]) evaluates to True regardless of the falsy integer 0 inside it.',
  },
  // C/C++
  {
    id: 'cpp-1',
    subject: 'C/C++',
    difficulty: 'Medium',
    question: 'Which C++ smart pointer enforces exclusive ownership of a dynamically allocated resource and cannot be copied?',
    options: {
      A: 'std::shared_ptr',
      B: 'std::weak_ptr',
      C: 'std::unique_ptr',
      D: 'std::auto_ptr',
    },
    correctOption: 'C',
    explanation: 'std::unique_ptr provides zero-overhead exclusive ownership of a heap object; it deletes its copy constructor and allows ownership transfer only via std::move.',
  },
  // DBMS & SQL
  {
    id: 'dbms-1',
    subject: 'DBMS',
    difficulty: 'Easy',
    question: 'A table is in Third Normal Form (3NF) if it is in 2NF and contains no:',
    options: {
      A: 'Foreign keys',
      B: 'Transitive functional dependencies of non-prime attributes on the primary key',
      C: 'Composite primary keys',
      D: 'Nullable columns',
    },
    correctOption: 'B',
    explanation: '3NF requires that the relation be in 2NF and that no non-prime attribute is transitively dependent on the primary key through another non-prime attribute.',
  },
  {
    id: 'sql-1',
    subject: 'SQL',
    difficulty: 'Easy',
    question: 'Which SQL clause is used to filter grouped rows AFTER an aggregate function like COUNT() or SUM() is applied?',
    options: {
      A: 'WHERE',
      B: 'HAVING',
      C: 'ORDER BY',
      D: 'DISTINCT',
    },
    correctOption: 'B',
    explanation: 'WHERE filters individual rows before grouping (GROUP BY), whereas HAVING filters aggregated groups after GROUP BY is evaluated.',
  },
  // Computer Networks
  {
    id: 'net-1',
    subject: 'Computer Networks',
    difficulty: 'Easy',
    question: 'Which sequence of packets correctly represents the TCP 3-Way Handshake used to establish a connection?',
    options: {
      A: 'ACK → SYN → FIN',
      B: 'SYN → SYN-ACK → ACK',
      C: 'SYN → ACK → FIN-ACK',
      D: 'GET → 200 OK → ACK',
    },
    correctOption: 'B',
    explanation: 'To establish a TCP session, the client sends SYN, the server responds with SYN-ACK, and the client replies with ACK to synchronize sequence numbers.',
  },
  // Operating Systems
  {
    id: 'os-1',
    subject: 'Operating Systems',
    difficulty: 'Medium',
    question: 'Which of the following is NOT one of Coffman’s four necessary conditions for a resource Deadlock?',
    options: {
      A: 'Mutual Exclusion',
      B: 'Hold and Wait',
      C: 'Preemption of Resources',
      D: 'Circular Wait',
    },
    correctOption: 'C',
    explanation: 'The four necessary conditions for deadlock are Mutual Exclusion, Hold and Wait, NO Preemption, and Circular Wait. Allowing preemption actually prevents deadlock.',
  },
  // OOP
  {
    id: 'oop-1',
    subject: 'OOP',
    difficulty: 'Easy',
    question: 'Which OOP principle describes binding data fields and the methods that manipulate them together while restricting direct external access?',
    options: {
      A: 'Polymorphism',
      B: 'Encapsulation',
      C: 'Multiple Inheritance',
      D: 'Dynamic Dispatch',
    },
    correctOption: 'B',
    explanation: 'Encapsulation bundles data and methods inside a class and restricts direct field access via access modifiers (like private), exposing controlled getter/setter or domain methods.',
  },
  // Web Development
  {
    id: 'web-1',
    subject: 'Web Development',
    difficulty: 'Easy',
    question: 'Which HTTP method is defined as both idempotent and used to completely replace a target resource representation?',
    options: {
      A: 'POST',
      B: 'PUT',
      C: 'PATCH',
      D: 'CONNECT',
    },
    correctOption: 'B',
    explanation: 'PUT is idempotent (calling it once or N times with the same payload leaves the server in the same state) and replaces the target resource, whereas POST creates a new resource and is not idempotent.',
  },
  // AI/ML
  {
    id: 'aiml-1',
    subject: 'AI/ML',
    difficulty: 'Medium',
    question: 'When a machine learning model achieves 99% accuracy on training data but only 62% accuracy on unseen validation data, it is suffering from:',
    options: {
      A: 'High Bias (Underfitting)',
      B: 'High Variance (Overfitting)',
      C: 'Vanishing Gradients',
      D: 'Label Smoothing',
    },
    correctOption: 'B',
    explanation: 'A large gap between high training performance and poor validation generalization indicates High Variance (Overfitting), where the model memorized training noise.',
  },
  // Cloud
  {
    id: 'cloud-1',
    subject: 'Cloud',
    difficulty: 'Easy',
    question: 'Adding more instances of an application server behind a Load Balancer to handle increased traffic is known as:',
    options: {
      A: 'Vertical Scaling (Scaling Up)',
      B: 'Horizontal Scaling (Scaling Out)',
      C: 'Database Normalization',
      D: 'Content Delivery Caching',
    },
    correctOption: 'B',
    explanation: 'Horizontal Scaling (Scaling Out) adds more nodes/instances to a pool, whereas Vertical Scaling (Scaling Up) adds more CPU/RAM to a single machine.',
  },
  // Software Engineering
  {
    id: 'se-1',
    subject: 'Software Engineering',
    difficulty: 'Medium',
    question: 'In the SOLID object-oriented design principles, what does the "S" (Single Responsibility Principle) state?',
    options: {
      A: 'A class should have only one method',
      B: 'A class should have only one reason to change (one cohesive responsibility)',
      C: 'A class should only be instantiated once as a Singleton',
      D: 'Subtypes must be substitutable for their base types',
    },
    correctOption: 'B',
    explanation: 'The Single Responsibility Principle (SRP) states that every module or class should have responsibility over a single part of the software’s functionality and only one reason to change.',
  },
];

export function getQuizQuestionsForSubject(
  subject: SubjectId,
  difficulty: QuizDifficulty,
  count: number = 5
): QuizQuestion[] {
  // Filter by subject first
  const exactMatches = QUIZ_QUESTION_BANK.filter(
    (q) => q.subject === subject && q.difficulty === difficulty
  );
  const subjectMatches = QUIZ_QUESTION_BANK.filter((q) => q.subject === subject);

  const generatedExtras: QuizQuestion[] = [
    {
      id: `${subject}-gen-1`,
      subject,
      difficulty,
      question: `In ${subject}, which characteristic is most critical when designing production-ready solutions for technical interviews?`,
      options: {
        A: 'Ignoring boundary conditions to minimize line count',
        B: 'Balancing optimal time/space complexity with clean, maintainable modular design',
        C: 'Using global mutable variables for all state sharing',
        D: 'Avoiding error handling to reduce CPU cycles',
      },
      correctOption: 'B',
      explanation: `In ${subject} interviews, evaluators look for both algorithmic/architectural efficiency (optimal time and space bounds) and clean, maintainable abstractions that handle edge cases gracefully.`,
    },
    {
      id: `${subject}-gen-2`,
      subject,
      difficulty,
      question: `When analyzing performance bottlenecks in ${subject}, why is asymptotic complexity analysis preferred over raw wall-clock benchmarks alone?`,
      options: {
        A: 'Wall-clock time never changes across hardware',
        B: 'Asymptotic analysis measures how resource growth scales independently of machine-specific hardware variations',
        C: 'Asymptotic notation ignores input size n',
        D: 'Compilers require Big-O comments to compile source code',
      },
      correctOption: 'B',
      explanation: `Asymptotic complexity (Big-O) characterizes the growth rate of operations and memory as input size n scales, independent of CPU clock speed or OS background tasks.`,
    },
    {
      id: `${subject}-gen-3`,
      subject,
      difficulty,
      question: `Which practice best prevents regression bugs when refactoring core ${subject} components?`,
      options: {
        A: 'Removing type checks and assertions',
        B: 'Writing deterministic unit tests covering nominal paths, boundary inputs, and failure modes',
        C: 'Combining all logic into a single monolithic function',
        D: 'Disabling compiler warnings',
      },
      correctOption: 'B',
      explanation: `Deterministic unit tests covering standard inputs, boundary conditions (empty, single element, max capacity), and error cases ensure behavioral invariants hold during refactoring.`,
    },
    {
      id: `${subject}-gen-4`,
      subject,
      difficulty,
      question: `During a technical interview on ${subject}, what is the recommended first step before writing implementation code?`,
      options: {
        A: 'Start typing code immediately without speaking',
        B: 'Clarify input constraints, edge cases, and expected behavior with concrete examples',
        C: 'Import every third-party library available',
        D: 'Optimize premature micro-benchmarks before finding a working algorithm',
      },
      correctOption: 'B',
      explanation: `Clarifying requirements, input sizes, data types, and edge cases up front prevents solving the wrong problem and demonstrates structured engineering communication.`,
    },
  ];

  const combined = [...exactMatches];
  for (const q of subjectMatches) {
    if (!combined.some((item) => item.id === q.id)) {
      combined.push(q);
    }
  }
  for (const q of generatedExtras) {
    if (combined.length < count) {
      combined.push(q);
    }
  }
  for (const q of QUIZ_QUESTION_BANK) {
    if (combined.length < count && !combined.some((item) => item.id === q.id)) {
      combined.push(q);
    }
  }

  return combined.slice(0, count);
}
