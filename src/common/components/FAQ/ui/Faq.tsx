import styles from "./Faq.module.css"

const faqItems = [
  {
    question: "How do I create a to-do list?",
    answer:
      'Select "Create list", enter a name for your list, and confirm. Your new list will appear in the sidebar.',
  },
  {
    question: "How do I add a task to a list?",
    answer:
      "Click the input in the list you want to use, enter the task name, and confirm button, or press Enter. The task will be added to that list.",
  },
  {
    question: "How do I mark a task as complete?",
    answer:
      "Click the checkbox next to a task to mark it as complete. Click it again to change the task back to incomplete.",
  },
  {
    question: "How do I change a list or task name?",
    answer:
      "Double-click the list or task name to edit it. Type the new name and click out to save, or to cancel.",
  },
  {
    question: "Can I update a task after I create it?",
    answer:
      "Yes. You can change a task's status using its checkbox or rename it by double-clicking its name.",
  },
];

export const Faq = () => {
  return (
    <section className={styles.faqList} aria-label="Frequently asked questions">
      {faqItems.map((item) => (
        <details className={styles.faqItem} key={item.question}>
          <summary className={styles.faqQuestion}>{item.question}</summary>
          <p className={styles.faqAnswer}>{item.answer}</p>
        </details>
      ))}
    </section>
  )
}
