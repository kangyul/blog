---
title: 2026 November 14th
pubDatetime: 2026-11-14T13:38:32+09:00
description: Stack vs heap, dynamic allocation, RAII, and how metal-cpp manages object lifetimes.
tags:
  - graphics
  - cpp
  - metal
draft: false
---
# The stack and the heap
[The stack and the heap](https://www.learncpp.com/cpp-tutorial/the-stack-and-the-heap/)

- The memory that a program uses is typically divided into a few different areas: "segments"

1. The code segment) the compiled program sits in memory; "read-only"
2. The bss segment) zero-initialized global and static variables are stored.
3. The data segment) initialized global and static variables are stored.
4. The heap) dynamically allocated variables are allocated from.
5. The call stack) function parameters, local variables, and other function-related information are stored.

Q. Is RAM divided into fixed sections ahead of time?
A. No, it's dynamic. RAM isn't divided into fixed sections ahead of time. The OS gives memory to programs as they ask for it, so whichever program needs more gets more.

**Heap**
- Allocating memory is slow.
- Allocated memory stays allocated until it's specifically deallocated or the application ends.
- Dynamically allocated memory must be accessed through a pointer. Dereferencing a pointer is slower than accessing a variable directly.
- Because the heap is a big pool of memory, large arrays, structures, or classes can be allocated here.

**Stack**
- Allocating memory is fast.
- Allocated memory stays in scope as long as it's on the stack; it's destroyed when it's popped off the stack.
- All memory allocated on the stack is known at compile time. Consequently, this memory can be accessed through a variable.
- Because the stack is relatively small, it's generally not a good idea to do anything that eats up lots of stack space. This includes allocating or copying large arrays or other memory-intensive structures.

# Dynamic memory allocation with new and delete
[Dynamic memory allocation with new and delete](https://www.learncpp.com/cpp-tutorial/dynamic-memory-allocation-with-new-and-delete/)

C++ supports three basic types of memory allocation.

* **Static memory allocation:** for static and global variables; allocated once when your program is run and persists throughout the life of your program.
* **Automatic memory allocation**: for function params and local variables. Memory is allocated when the relevant block is entered, and freed when the block is exited.
* **Dynamic memory allocation**: a way for running programs to request memory from the OS when needed.

Static & Automatic memory allocation's limit
- The size of the variable / array must be known at the compile time.
- Memory allocation and deallocation happens automatically.

## Dangling Pointers
- A dangling pointer is a pointer to an object that no longer exists, either because its memory was freed (delete) or because its lifetime ended. Dereferencing it, or deleting it again, is undefined behavior.

## Memory Leaks
- Memory leaks happen when your program loses the address of some bit of dynamically allocated memory before giving it back to the operating system. The program cannot delete the dynamically allocated memory, because it lost the address. The OS also can't use this memory, because that memory is considered to be still in use by the program.

# Destructors
[Destructors](https://www.learncpp.com/cpp-tutorial/destructors/)

**Destructor**: a special kind of class member function that is executed when an object of that class is destroyed.

## RAII
- Resource Acquisition Is Initialization
- A programming technique whereby resource use is tied to the lifetime of objects with automatic duration -- resources are acquired on initialization, and cleaned up automatically on destruction.

# Applying C++ concepts to Metal-cpp

Why does the `Renderer` destructor call release() on `_pCommandQueue` and `_pDevice` ?
* Destroying the Renderer means it no longer needs the device and command queue, so it gives up its ownership by calling `release()`. Each `release()` lowers the object's reference count, and the object is only freed when the count reaches 0. The device lives on, because the app delegate still owns it. 

Why doesn't `draw()` call `release()` on `pCmd` , the command buffer?
* `pCmd` is a temporary object so it's released in `pPool->release()` 
	Objects from functions whose names start with alloc, new, copy, mutableCopy or create are owned must be released. Everything else is autoreleased.

How is that destructor an example of RAII, which you learned?
* The Renderer acquires its resources in the constructor (`newCommandQueue(), retain()`) and gives them back in the destructor.