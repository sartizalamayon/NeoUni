// src/app/api/roles/route.js

import { getCollection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const rolesCollection = await getCollection('roles');
    const roles = await rolesCollection.find({}).toArray();
    
    return Response.json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { name, description, permissions } = await request.json();
    
    if (!name || !permissions || !Array.isArray(permissions)) {
      return Response.json({ error: 'Invalid role data' }, { status: 400 });
    }
    
    const rolesCollection = await getCollection('roles');
    
    // Check if role already exists
    const existingRole = await rolesCollection.findOne({ name });
    if (existingRole) {
      return Response.json({ error: 'Role already exists' }, { status: 400 });
    }
    
    // Create new role
    const newRole = {
      name,
      description: description || '',
      permissions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await rolesCollection.insertOne(newRole);
    
    return Response.json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}