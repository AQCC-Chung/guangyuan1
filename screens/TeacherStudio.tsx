import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { Course, Chapter } from '../types';
import { Plus, Edit2, Trash2, Video, List, Info, ChevronLeft, Save, Play, Clock, BarChart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// 模擬講師課程數據 (實際應從 Google Sheet API 取得)
const MOCK_TEACHER_COURSES: Course[] = [
  {
    id: 'c-1',
    title: '量子科技與現代居家健康',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
    duration: '120 min',
    difficulty: '初階',
    benefit: '了解量子水的分子結構與健康益處',
    category: '科技教育',
    status: 'published',
    instructorId: 'teacher-001',
    chapters: [
      { id: 'ch-1', title: '什麼是量子糾纏？', videoUrl: 'https://vimeo.com/123', duration: '15:00' },
      { id: 'ch-2', title: '全戶式過濾系統原理', videoUrl: 'https://vimeo.com/456', duration: '25:00' }
    ]
  }
];

export const TeacherStudio: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(MOCK_TEACHER_COURSES);

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除這門課程嗎？此動作無法復原。')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">我的課程庫</h2>
          <p className="text-xs text-gray-400">目前共有 {courses.length} 門課程</p>
        </div>
        <Button size="sm" onClick={() => navigate('/teacher/edit/new')}>
          <Plus className="w-4 h-4 mr-1" /> 新增課程
        </Button>
      </div>

      <div className="grid gap-4">
        {courses.map(course => (
          <Card key={course.id} className="flex gap-4 p-3 relative">
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
              <img src={course.thumbnail} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm line-clamp-1 pr-12">{course.title}</h3>
                  <Badge 
                    label={course.status === 'published' ? '已發佈' : '草稿'} 
                    color={course.status === 'published' ? 'green' : 'gray'} 
                  />
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                  <span className="flex items-center gap-0.5"><Clock className="w-3 h-3"/> {course.duration}</span>
                  <span className="flex items-center gap-0.5"><Video className="w-3 h-3"/> {course.chapters?.length || 0} 章節</span>
                  <span className="flex items-center gap-0.5"><BarChart className="w-3 h-3"/> {course.difficulty}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/teacher/edit/${course.id}`)}
                  className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center gap-1 active:bg-gray-50"
                >
                  <Edit2 className="w-3 h-3" /> 編輯內容
                </button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="p-1.5 rounded-lg border border-red-100 text-red-400 active:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Card>
        ))}

        {courses.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>尚未建立任何課程</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const CourseEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === 'new';

  const [form, setForm] = useState<Partial<Course>>({
    title: '',
    thumbnail: '',
    difficulty: '初階',
    benefit: '',
    category: '科技教育',
    duration: '',
    status: 'draft',
    chapters: []
  });

  useEffect(() => {
    if (!isNew) {
      const course = MOCK_TEACHER_COURSES.find(c => c.id === id);
      if (course) setForm(course);
    }
  }, [id, isNew]);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      title: '',
      videoUrl: '',
      duration: ''
    };
    setForm({ ...form, chapters: [...(form.chapters || []), newChapter] });
  };

  const updateChapter = (index: number, field: keyof Chapter, value: string) => {
    const updatedChapters = [...(form.chapters || [])];
    updatedChapters[index] = { ...updatedChapters[index], [field]: value };
    setForm({ ...form, chapters: updatedChapters });
  };

  const removeChapter = (index: number) => {
    const updatedChapters = (form.chapters || []).filter((_, i) => i !== index);
    setForm({ ...form, chapters: updatedChapters });
  };

  const handleSave = () => {
    console.log('Saving Course:', form);
    // 實作保存邏輯...
    navigate('/teacher/studio');
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">{isNew ? '新增課程內容' : '編輯課程'}</h2>
      </div>

      <div className="space-y-4">
        {/* Basic Info Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Info className="w-4 h-4" />
            <h3 className="font-bold text-sm">基礎資訊</h3>
          </div>
          <Card className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1">課程標題</label>
              <input 
                type="text" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})}
                placeholder="例如：初學者量子科技入門" 
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1">難度等級</label>
                <select 
                  value={form.difficulty} 
                  onChange={e => setForm({...form, difficulty: e.target.value as any})}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm"
                >
                  <option>初階</option>
                  <option>中階</option>
                  <option>高階</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1">課程分類</label>
                <input 
                  type="text" 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1">封面圖片網址</label>
              <input 
                type="text" 
                value={form.thumbnail} 
                onChange={e => setForm({...form, thumbnail: e.target.value})}
                placeholder="https://..." 
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1">學員收穫 (一句話簡介)</label>
              <textarea 
                value={form.benefit} 
                onChange={e => setForm({...form, benefit: e.target.value})}
                rows={2}
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm resize-none" 
              />
            </div>
          </Card>
        </section>

        {/* Chapters Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <List className="w-4 h-4" />
              <h3 className="font-bold text-sm">章節與影片</h3>
            </div>
            <button 
              onClick={addChapter}
              className="text-xs font-bold text-primary flex items-center gap-1 active:opacity-60"
            >
              <Plus className="w-3 h-3" /> 新增章節
            </button>
          </div>

          <div className="space-y-3">
            {form.chapters?.map((chapter, index) => (
              <Card key={chapter.id} className="p-4 relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">章節 {index + 1}</span>
                  <button onClick={() => removeChapter(index)} className="text-gray-300 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={chapter.title} 
                    onChange={e => updateChapter(index, 'title', e.target.value)}
                    placeholder="影片標題" 
                    className="w-full border-b border-gray-100 pb-2 text-sm font-bold focus:outline-none focus:border-primary transition-colors" 
                  />
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                       <Play className="absolute left-2 top-2.5 w-3.5 h-3.5 text-gray-300" />
                       <input 
                        type="text" 
                        value={chapter.videoUrl} 
                        onChange={e => updateChapter(index, 'videoUrl', e.target.value)}
                        placeholder="影片網址 (Vimeo/YouTube)" 
                        className="w-full bg-gray-50 rounded-lg py-2 pl-8 pr-3 text-xs" 
                      />
                    </div>
                    <div className="w-24 relative">
                       <Clock className="absolute left-2 top-2.5 w-3.5 h-3.5 text-gray-300" />
                       <input 
                        type="text" 
                        value={chapter.duration} 
                        onChange={e => updateChapter(index, 'duration', e.target.value)}
                        placeholder="05:00" 
                        className="w-full bg-gray-50 rounded-lg py-2 pl-8 pr-3 text-xs" 
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {(form.chapters?.length || 0) === 0 && (
              <button 
                onClick={addChapter}
                className="w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm flex flex-col items-center gap-2 active:bg-gray-50"
              >
                <Plus className="w-6 h-6" />
                <span>點擊開始建立第一個章節</span>
              </button>
            )}
          </div>
        </section>

        <div className="pt-6 grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>取消</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" /> 保存變更
          </Button>
        </div>
      </div>
    </div>
  );
};