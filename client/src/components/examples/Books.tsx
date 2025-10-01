import Books from '../Books'
import book1Cover from '@assets/generated_images/Terraform_book_cover_design_cd903b98.png'
import book2Cover from '@assets/generated_images/VMware_strategy_book_cover_1194819c.png'

export default function BooksExample() {
  const mockBooks = [
    {
      id: "terraform",
      title: "Reverse Engineering with Terraform",
      description: "A practical guide to automation, integration, and scalability with Terraform.",
      coverImage: book1Cover,
      buyUrl: "https://www.amazon.in/Reverse-Engineering-Terraform-Introduction-Infrastructure/dp/B0CKSDNNNX"
    },
    {
      id: "vmware",
      title: "Navigating VMware Turmoil",
      description: "Strategic insights for enterprises transitioning from VMware to cloud alternatives.",
      coverImage: book2Cover,
      buyUrl: "#"
    }
  ]
  
  return <Books books={mockBooks} />
}
