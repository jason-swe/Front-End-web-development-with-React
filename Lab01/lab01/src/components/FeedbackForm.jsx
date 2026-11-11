import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function FeedbackForm({ orchid, user, onSubmit }) {
  const existingFeedback = useMemo(
    () => orchid.feedback?.find((item) => item.author === user?.email),
    [orchid.feedback, user?.email],
  );
  const formik = useFormik({
    initialValues: { rating: existingFeedback?.rating || 5, comment: existingFeedback?.comment || '' },
    enableReinitialize: true,
    validationSchema: Yup.object({
      rating: Yup.number().min(1).max(5).required(),
      comment: Yup.string().trim().min(3).required('Comment is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({ rating: Number(values.rating), comment: values.comment.trim(), author: user.email, date: existingFeedback?.date || new Date().toISOString() });
      resetForm();
    },
  });

  if (!user) {
    return <p>Please log in with Google to leave feedback.</p>;
  }
  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
      <label>
        Rating
        <select name="rating" value={formik.values.rating} onChange={formik.handleChange} style={{ marginLeft: 8 }}>
          {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} / 5</option>)}
        </select>
      </label>
      <textarea
        required
        minLength={3}
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        placeholder="Write your feedback"
        rows={3}
        style={{ padding: 10, borderRadius: 8, resize: 'vertical' }}
      />
      {formik.errors.comment && formik.touched.comment && <small>{formik.errors.comment}</small>}
      <button type="submit" style={{ background: '#F7B6C2', border: 0, borderRadius: 8, padding: '10px 18px', fontWeight: 700 }}>
        {existingFeedback ? 'Update feedback' : 'Submit feedback'}
      </button>
    </form>
  );
}

export default FeedbackForm;
