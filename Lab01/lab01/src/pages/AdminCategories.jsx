import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/categoryApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AdminCategories({ darkMode, isAdmin }) {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [error, setError] = React.useState('');

  const loadCategories = React.useCallback(async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      setError('');
    } catch (loadError) {
      console.error('Fetch categories error:', loadError);
      setError('Categories API is not available. Configure VITE_CATEGORIES_API_URL.');
    }
  }, []);

  React.useEffect(() => { if (isAdmin) loadCategories(); }, [isAdmin, loadCategories]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: editing?.name || '' },
    validationSchema: Yup.object({ name: Yup.string().trim().min(2).required('Category name is required') }),
    onSubmit: async ({ name }) => {
    try {
      if (editing) await updateCategory(editing.id, { ...editing, name });
      else await createCategory({ name });
      setEditing(null);
      await loadCategories();
    } catch (saveError) {
      console.error('Save category error:', saveError);
      setError('Category could not be saved.');
    }
    },
  });

  if (!isAdmin) return <main style={{ padding: 120 }}>Only an administrator can manage categories.</main>;

  const remove = async (id) => {
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (deleteError) {
      console.error('Delete category error:', deleteError);
      setError('Category could not be deleted.');
    }
  };

  return (
    <main style={{ padding: '120px 8% 60px', minHeight: '70vh', background: darkMode ? '#181818' : '#fff', color: darkMode ? '#fff' : '#222' }}>
      <button onClick={() => navigate(-1)} style={{ color: darkMode ? '#fff' : '#222' }}>Back</button>
      <h1>Category management</h1>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 500, marginBottom: 24 }}>
        <input name="name" required value={formik.values.name} onChange={formik.handleChange} placeholder="Category name" />
        <button type="submit" style={{ color: darkMode ? '#222' : '#222' }}>{editing ? 'Update' : 'Add'}</button>
        {formik.errors.name && formik.touched.name && <small>{formik.errors.name}</small>}
        {editing && <button type="button" onClick={() => setEditing(null)} style={{ color: darkMode ? '#fff' : '#222' }}>Cancel</button>}
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id} style={{ marginBottom: 10 }}>
            {category.name}
            <button onClick={() => setEditing(category)} style={{ marginLeft: 12, color: darkMode ? '#222' : '#222' }}>Edit</button>
            <button onClick={() => remove(category.id)} style={{ marginLeft: 8, color: darkMode ? '#222' : '#222' }}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AdminCategories;
