import { type User, type InsertUser, type Appointment, type InsertAppointment, type Subscriber, type InsertSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private appointments: Map<string, Appointment>;
  private subscribers: Map<string, Subscriber>;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.subscribers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      message: insertAppointment.message ?? null,
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const existing = this.subscribers.get(insertSubscriber.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = randomUUID();
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date(),
    };
    this.subscribers.set(subscriber.email, subscriber);
    return subscriber;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return this.subscribers.get(email);
  }
}

export const storage = new MemStorage();
