'use client'

import { useState, useEffect } from 'react'
import styles from '../admin.module.scss'

interface Slide {
  id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  imageUrl: string
  order: number
  active: boolean
  hasEmbeddedText: boolean // Nueva propiedad: si la imagen ya tiene texto
  createdAt: string
}

export default function SlidersAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Slide, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageUrl: '',
    order: 1,
    active: true,
    hasEmbeddedText: false,
  })

  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = () => {
    const savedSlides = localStorage.getItem('slides')
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides))
    }
  }

  const saveSlides = (updatedSlides: Slide[]) => {
    localStorage.setItem('slides', JSON.stringify(updatedSlides))
    setSlides(updatedSlides)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      // Update existing slide
      const updatedSlides = slides.map((slide) =>
        slide.id === editingId
          ? { ...slide, ...formData }
          : slide
      )
      saveSlides(updatedSlides)
    } else {
      // Create new slide
      const newSlide: Slide = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      saveSlides([...slides, newSlide])
    }

    resetForm()
  }

  const handleEdit = (slide: Slide) => {
    setFormData({
      title: slide.title,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      imageUrl: slide.imageUrl,
      order: slide.order,
      active: slide.active,
      hasEmbeddedText: slide.hasEmbeddedText,
    })
    setEditingId(slide.id)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este slide?')) {
      const updatedSlides = slides.filter((slide) => slide.id !== id)
      saveSlides(updatedSlides)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      imageUrl: '',
      order: slides.length + 1,
      active: true,
      hasEmbeddedText: false,
    })
    setEditingId(null)
    setIsEditing(false)
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newSlides.length) return

    // Swap slides
    ;[newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]

    // Update order numbers
    newSlides.forEach((slide, idx) => {
      slide.order = idx + 1
    })

    saveSlides(newSlides)
  }

  const sortedSlides = [...slides].sort((a, b) => a.order - b.order)

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminHeader}>
        <h1>Gestión de Sliders</h1>
        <button className={styles.btnPrimary} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancelar' : '+ Nuevo Slide'}
        </button>
      </div>

      {isEditing && (
        <div className={styles.formCard}>
          <h2>{editingId ? 'Editar Slide' : 'Nuevo Slide'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>URL de la Imagen *</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/slider/slide-1.jpg"
                  required
                />
                <small>Ruta de la imagen o URL completa</small>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.hasEmbeddedText}
                    onChange={(e) => setFormData({ ...formData, hasEmbeddedText: e.target.checked })}
                  />
                  {' '}La imagen ya tiene texto incorporado
                </label>
                <small>Marque si la imagen ya contiene texto y no necesita superposición</small>
              </div>
            </div>

            {!formData.hasEmbeddedText && (
              <>
                <div className={styles.formGroup}>
                  <label>Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título del slide"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descripción del slide"
                    rows={3}
                  />
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Texto del Botón</label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      placeholder="Ver productos"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Link del Botón</label>
                    <input
                      type="text"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      placeholder="/tienda"
                    />
                  </div>
                </div>
              </>
            )}

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Orden</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="1"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  {' '}Activo
                </label>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>
                {editingId ? 'Actualizar' : 'Crear'} Slide
              </button>
              <button type="button" className={styles.btnSecondary} onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        <h2>Slides ({sortedSlides.length})</h2>
        {sortedSlides.length === 0 ? (
          <p className={styles.emptyState}>No hay slides. Crea el primero.</p>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Vista Previa</th>
                  <th>Título</th>
                  <th>Tiene Texto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedSlides.map((slide, index) => (
                  <tr key={slide.id}>
                    <td>
                      <div className={styles.orderControls}>
                        {slide.order}
                        <div className={styles.orderButtons}>
                          <button
                            onClick={() => moveSlide(index, 'up')}
                            disabled={index === 0}
                            title="Subir"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSlide(index, 'down')}
                            disabled={index === sortedSlides.length - 1}
                            title="Bajar"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className={styles.thumbnailImage}
                      />
                    </td>
                    <td>
                      <strong>{slide.title || '(Sin título)'}</strong>
                      {slide.description && (
                        <div className={styles.description}>{slide.description.substring(0, 50)}...</div>
                      )}
                    </td>
                    <td>
                      {slide.hasEmbeddedText ? (
                        <span className={styles.badgeInfo}>Sí</span>
                      ) : (
                        <span className={styles.badgeWarning}>No</span>
                      )}
                    </td>
                    <td>
                      <span className={slide.active ? styles.badgeSuccess : styles.badgeDanger}>
                        {slide.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.btnEdit}
                          onClick={() => handleEdit(slide)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className={styles.btnDelete}
                          onClick={() => handleDelete(slide.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
