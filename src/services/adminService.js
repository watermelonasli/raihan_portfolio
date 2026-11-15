import { supabase } from '../lib/supabase';

export const adminService = {
  // --- SKILLS ---
  getSkills: async () => {
    const { data, error } = await supabase.from('skills').select('*').order('display_order');
    if (error) throw error;
    return data;
  },
  createSkill: async (data) => {
    const { error } = await supabase.from('skills').insert([data]);
    if (error) throw error;
  },
  updateSkill: async (id, data) => {
    const { error } = await supabase.from('skills').update(data).eq('id', id);
    if (error) throw error;
  },
  deleteSkill: async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
  },

  // --- PROJECTS ---
  getProjects: async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  createProject: async (data) => {
    const { error } = await supabase.from('projects').insert([data]);
    if (error) throw error;
  },
  updateProject: async (id, data) => {
    const { error } = await supabase.from('projects').update(data).eq('id', id);
    if (error) throw error;
  },
  deleteProject: async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },

  // --- EXPERIENCES ---
  getExperiences: async () => {
    const { data, error } = await supabase.from('experiences').select('*').order('display_order');
    if (error) throw error;
    return data;
  },
  createExperience: async (data) => {
    const { error } = await supabase.from('experiences').insert([data]);
    if (error) throw error;
  },
  updateExperience: async (id, data) => {
    const { error } = await supabase.from('experiences').update(data).eq('id', id);
    if (error) throw error;
  },
  deleteExperience: async (id) => {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
  },

  // --- CERTIFICATES ---
  getCertificates: async () => {
    const { data, error } = await supabase.from('certificates').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
  createCertificate: async (data) => {
    const { error } = await supabase.from('certificates').insert([data]);
    if (error) throw error;
  },
  updateCertificate: async (id, data) => {
    const { error } = await supabase.from('certificates').update(data).eq('id', id);
    if (error) throw error;
  },
  deleteCertificate: async (id) => {
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) throw error;
  },

  // --- ARTICLES ---
  getArticles: async () => {
    const { data, error } = await supabase.from('articles').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
  createArticle: async (data) => {
    const { error } = await supabase.from('articles').insert([data]);
    if (error) throw error;
  },
  updateArticle: async (id, data) => {
    const { error } = await supabase.from('articles').update(data).eq('id', id);
    if (error) throw error;
  },
  deleteArticle: async (id) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
  },

  // --- STORAGE UPLOAD ---
  uploadImage: async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
    return data.publicUrl;
  }
};