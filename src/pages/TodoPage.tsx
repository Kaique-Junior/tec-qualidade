import { Footer } from "@/components/Footer";
import { 
  TodoHeader, 
  BackButton, 
  TaskList, 
  TrashSection, 
  CreateTaskModal, 
  EditTaskModal, 
  AddTaskButton 
} from "@/contexts/todolist/components";
import { useTodoPage } from "@/contexts/todolist/hooks/useTodoPage";

/**
 * Página de gerenciamento de tarefas do usuário.
 * Composição pura de componentes - toda lógica em useTodoPage hook.
 */
export default function TodoPage() {
  const {
    user,
    authLoading,
    showLogoutDialog,
    setShowLogoutDialog,
    handleLogout,
    handleBackToHome,
    todos,
    completedTodos,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDueDate,
    setNewTaskDueDate,
    editTaskTitle,
    setEditTaskTitle,
    editTaskDueDate,
    setEditTaskDueDate,
    handleOpenModal,
    handleCloseModal,
    handleSubmitTask,
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdateTask,
    handleToggleTodo,
    handleDeletePermanent,
    getDueDateBadgeInfo,
  } = useTodoPage();

  // Redirect se não autenticado
  if (!user && !authLoading) {
    window.location.href = '/login';
    return null;
  }

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      <TodoHeader 
        user={user} 
        onBackClick={handleBackToHome} 
        onLogoutClick={handleLogout}
        showLogoutDialog={showLogoutDialog}
        setShowLogoutDialog={setShowLogoutDialog}
      />

      <main className="flex-1 flex flex-col">
        <div className="py-4">
          <BackButton onClick={handleBackToHome} />
        </div>

        <div className="max-w-xl mx-auto w-full px-4 mt-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-50">Tarefas Ativas</h2>
            <AddTaskButton onClick={handleOpenModal} disabled={isLoading} />
          </div>

          <TaskList
            todos={todos}
            isLoading={isLoading}
            animatingTaskId={null}
            onToggle={handleToggleTodo}
            onEdit={handleOpenEditModal}
            onDelete={handleDeletePermanent}
            getDueDateBadgeInfo={getDueDateBadgeInfo}
          />

          <TrashSection
            completedTodos={completedTodos}
            isLoading={isLoading}
            showTrash={false}
            setShowTrash={() => {}}
            onDelete={handleDeletePermanent}
            getDueDateBadgeInfo={getDueDateBadgeInfo}
          />
        </div>
      </main>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={newTaskTitle}
        setTitle={setNewTaskTitle}
        dueDate={newTaskDueDate}
        setDueDate={setNewTaskDueDate}
        onSubmit={handleSubmitTask}
        isLoading={isLoading}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={editTaskTitle}
        setTitle={setEditTaskTitle}
        dueDate={editTaskDueDate}
        setDueDate={setEditTaskDueDate}
        onSubmit={handleUpdateTask}
        isLoading={isLoading}
      />

      <Footer />
    </div>
  );
}